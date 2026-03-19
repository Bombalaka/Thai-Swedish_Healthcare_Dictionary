using ThaiSwedishDictionary.Domain.Entities;

namespace ThaiSwedishDictionary.Domain.Repositories;

public interface ISourceRepository
{
    Task<IEnumerable<Source>> GetAllAsync(CancellationToken cancellationToken = default);
}
