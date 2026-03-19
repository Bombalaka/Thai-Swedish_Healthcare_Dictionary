namespace ThaiSwedishDictionary.Application.DTOs;

public record TermDto(
    int Id,
    string SwedishWord,
    string ThaiWord,
    string DefinitionTh,
    int CategoryId,
    string? CategoryNameSv,
    string? CategoryNameTh,
    string? ContextExample,
    int SourceId,
    string? SourceName,
    DateTime CreatedAt
);
