namespace ThaiSwedishDictionary.Application.DTOs;

public record ImportResult(int ImportedCount, int SkippedCount, IReadOnlyList<string> Errors);
