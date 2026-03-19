using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace ThaiSwedishDictionary.Infrastructure.Data;

public class DictionaryDbContextFactory : IDesignTimeDbContextFactory<DictionaryDbContext>
{
    public DictionaryDbContext CreateDbContext(string[] args)
    {
        var basePath = Directory.GetCurrentDirectory();
        if (basePath.EndsWith("Infrastructure"))
            basePath = Path.Combine(basePath, "..", "ThaiSwedishDictionary.Api");
        var configuration = new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile("appsettings.json", optional: true)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection")
            ?? "Host=localhost;Database=thai_swedish_dictionary;Username=postgres;Password=postgres";

        var optionsBuilder = new DbContextOptionsBuilder<DictionaryDbContext>();
        optionsBuilder.UseNpgsql(connectionString);

        return new DictionaryDbContext(optionsBuilder.Options);
    }
}
