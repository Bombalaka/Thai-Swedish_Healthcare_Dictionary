using CsvHelper.Configuration.Attributes;

namespace ThaiSwedishDictionary.Application.DTOs;

public class CsvTermRow
{
    [Name("Category")]
    public string? Category { get; set; }

    [Name("Swedish Term")]
    public string? SwedishTerm { get; set; }

    [Name("Thai Translation")]
    public string? ThaiTranslation { get; set; }

    [Name("Definition / Context")]
    public string? DefinitionContext { get; set; }

    [Name("Simple Context Example (Swedish Only)")]
    public string? ContextExample { get; set; }

    [Name("# category_id")]
    public string? CategoryIdRaw { get; set; }

    [Name("# source_id")]
    public string? SourceIdRaw { get; set; }
}
