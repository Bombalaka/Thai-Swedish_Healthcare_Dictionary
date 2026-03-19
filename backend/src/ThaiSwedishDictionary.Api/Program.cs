using DotNetEnv;
using Microsoft.EntityFrameworkCore;
using ThaiSwedishDictionary.Application.Services;
using ThaiSwedishDictionary.Domain.Repositories;
using ThaiSwedishDictionary.Infrastructure.Data;
using ThaiSwedishDictionary.Infrastructure.Repositories;

// Load .env from project root (same file docker-compose uses)
// Try: 3 levels up from Api project, then current dir, then traverse
var envPath = Path.Combine(Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "..")), ".env");
if (!File.Exists(envPath))
    envPath = Path.Combine(Directory.GetCurrentDirectory(), ".env");
if (File.Exists(envPath))
    Env.Load(envPath);
else
    Env.TraversePath().Load();

// Build connection string: prefer NEON_* (avoids URL parsing issues), else ConnectionStrings__DefaultConnection, else POSTGRES_*
var neonHost = Environment.GetEnvironmentVariable("NEON_HOST");
var neonDb = Environment.GetEnvironmentVariable("NEON_DATABASE") ?? "neondb";
var neonUser = Environment.GetEnvironmentVariable("NEON_USER");
var neonPassword = Environment.GetEnvironmentVariable("NEON_PASSWORD");
if (!string.IsNullOrEmpty(neonHost) && !string.IsNullOrEmpty(neonUser) && !string.IsNullOrEmpty(neonPassword))
{
    Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection",
        $"Host={neonHost};Port=5432;Database={neonDb};Username={neonUser};Password={neonPassword};SSL Mode=Require");
}
else if (string.IsNullOrWhiteSpace(Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")))
{
    var pgUser = Environment.GetEnvironmentVariable("POSTGRES_USER") ?? "postgres";
    var pgPassword = Environment.GetEnvironmentVariable("POSTGRES_PASSWORD");
    var pgDb = Environment.GetEnvironmentVariable("POSTGRES_DB") ?? "thai_swedish_dictionary";
    if (!string.IsNullOrEmpty(pgPassword))
    {
        Environment.SetEnvironmentVariable("ConnectionStrings__DefaultConnection",
            $"Host=localhost;Port=5433;Database={pgDb};Username={pgUser};Password={pgPassword}");
    }
}

var builder = WebApplication.CreateBuilder(args);

var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{port}");
}

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DictionaryDbContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseNpgsql(connectionString);
});

builder.Services.AddScoped<ITermRepository, TermRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ISourceRepository, SourceRepository>();

builder.Services.AddScoped<ITermService, TermService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISourceService, SourceService>();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var allowedOrigins = Environment.GetEnvironmentVariable("CORS_ORIGINS");
        if (!string.IsNullOrWhiteSpace(allowedOrigins))
        {
            foreach (var origin in allowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries))
                policy.WithOrigins(origin);
        }
        else
        {
            policy.AllowAnyOrigin();
        }
        policy.AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DictionaryDbContext>();
    await context.Database.MigrateAsync();
    await DataSeeder.SeedAsync(context);
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

// Root route so ngrok/visitors see something instead of 404
app.MapGet("/", () => Results.Json(new
{
    message = "Thai-Swedish Dictionary API",
    swagger = "/swagger",
    api = new[] { "/api/terms", "/api/categories", "/api/sources" }
}));

app.MapControllers();

app.Run();
