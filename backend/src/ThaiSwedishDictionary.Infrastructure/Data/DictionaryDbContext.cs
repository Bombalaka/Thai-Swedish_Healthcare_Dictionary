using Microsoft.EntityFrameworkCore;
using ThaiSwedishDictionary.Domain.Entities;

namespace ThaiSwedishDictionary.Infrastructure.Data;

public class DictionaryDbContext : DbContext
{
    public DictionaryDbContext(DbContextOptions<DictionaryDbContext> options)
        : base(options)
    {
    }

    public DbSet<Term> Terms => Set<Term>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Source> Sources => Set<Source>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("categories");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.NameTh).HasColumnName("name_th").HasMaxLength(200);
            entity.Property(e => e.NameSv).HasColumnName("name_sv").HasMaxLength(200);
            entity.Property(e => e.ParentId).HasColumnName("parent_id");
            entity.Property(e => e.SortOrder).HasColumnName("sort_order");

            entity.HasOne(e => e.Parent)
                .WithMany(e => e.Children)
                .HasForeignKey(e => e.ParentId)
                .OnDelete(DeleteBehavior.Restrict);
        });

        modelBuilder.Entity<Source>(entity =>
        {
            entity.ToTable("sources");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name).HasColumnName("name").HasMaxLength(500);
            entity.Property(e => e.Url).HasColumnName("url").HasMaxLength(1000);
            entity.Property(e => e.Description).HasColumnName("description");
        });

        modelBuilder.Entity<Term>(entity =>
        {
            entity.ToTable("terms");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.SwedishWord).HasColumnName("swedish_word").HasMaxLength(500);
            entity.Property(e => e.ThaiWord).HasColumnName("thai_word").HasMaxLength(500);
            entity.Property(e => e.DefinitionTh).HasColumnName("definition_th");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.ContextExample).HasColumnName("context_example");
            entity.Property(e => e.SourceId).HasColumnName("source_id");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");

            entity.HasOne(e => e.Category)
                .WithMany(e => e.Terms)
                .HasForeignKey(e => e.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(e => e.Source)
                .WithMany(e => e.Terms)
                .HasForeignKey(e => e.SourceId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasIndex(e => e.SwedishWord);
        });
    }
}
