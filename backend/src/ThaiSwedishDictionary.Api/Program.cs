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
    
    // Automatically convert standard postgres:// URIs to .NET format
    if (!string.IsNullOrEmpty(connectionString) && connectionString.StartsWith("postgres"))
    {
        var databaseUri = new Uri(connectionString);
        var userInfo = databaseUri.UserInfo.Split(':');
        connectionString = $"Host={databaseUri.Host};Port={(databaseUri.Port > 0 ? databaseUri.Port : 5432)};Database={databaseUri.LocalPath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};SSL Mode=Require;Trust Server Certificate=true";
    }

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

// Root route – supports GET and HEAD (UptimeRobot uses HEAD by default)
app.MapMethods("/", new[] { "GET", "HEAD" }, () => Results.Json(new
{
    message = "Thai-Swedish Dictionary API",
    swagger = "/swagger",
    api = new[] { "/api/terms", "/api/categories", "/api/sources" }
}));

// Health check for monitoring – GET and HEAD
app.MapMethods("/health", new[] { "GET", "HEAD" }, () => Results.Ok());

app.MapControllers();

app.Run();
