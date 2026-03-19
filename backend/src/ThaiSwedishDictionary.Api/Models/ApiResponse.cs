namespace ThaiSwedishDictionary.Api.Models;

public record ApiResponse<T>(T? Data, ApiMeta? Meta, string[]? Errors);

public record ApiMeta(int Total);
