using ThaiSwedishDictionary.Application.DTOs;

namespace ThaiSwedishDictionary.Application.Services;

public interface ITermService
{
    Task<IReadOnlyList<TermDto>> SearchAsync(string swedishWord, int? categoryId, CancellationToken cancellationToken = default);
    Task<TermDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<TermDto>> GetByCategoryIdAsync(int categoryId, CancellationToken cancellationToken = default);
    Task<IReadOnlyList<TermDto>> GetRandomAsync(int limit, CancellationToken cancellationToken = default);
    Task<ImportResult> ImportFromCsvAsync(Stream csvStream, CancellationToken cancellationToken = default);
}
