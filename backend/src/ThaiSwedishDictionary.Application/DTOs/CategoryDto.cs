namespace ThaiSwedishDictionary.Application.DTOs;

public record CategoryDto(
    int Id,
    string NameTh,
    string NameSv,
    int? ParentId,
    int SortOrder,
    IReadOnlyList<CategoryDto> Children
);
