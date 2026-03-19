using ThaiSwedishDictionary.Domain.Entities;

namespace ThaiSwedishDictionary.Domain.Repositories;

public interface ITermRepository
{
    Task<IEnumerable<Term>> SearchAsync(string swedishWord, int? categoryId, CancellationToken cancellationToken = default);
    Task<Term?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<IEnumerable<Term>> GetByCategoryIdAsync(int categoryId, CancellationToken cancellationToken = default);
    Task<IEnumerable<Term>> GetRandomAsync(int limit, CancellationToken cancellationToken = default);
    Task<int> AddRangeAsync(IEnumerable<Term> terms, CancellationToken cancellationToken = default);
}
