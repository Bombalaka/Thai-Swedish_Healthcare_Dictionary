namespace ThaiSwedishDictionary.Domain.Entities;

public class Term
{
    public int Id { get; set; }
    public string SwedishWord { get; set; } = string.Empty;
    public string ThaiWord { get; set; } = string.Empty;
    public string DefinitionTh { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string? ContextExample { get; set; }
    public int SourceId { get; set; }
    public DateTime CreatedAt { get; set; }

    public Category Category { get; set; } = null!;
    public Source Source { get; set; } = null!;
}
