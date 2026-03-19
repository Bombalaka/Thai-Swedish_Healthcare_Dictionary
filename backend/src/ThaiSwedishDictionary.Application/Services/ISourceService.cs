using ThaiSwedishDictionary.Application.DTOs;

namespace ThaiSwedishDictionary.Application.Services;

public interface ISourceService
{
    Task<IReadOnlyList<SourceDto>> GetAllAsync(CancellationToken cancellationToken = default);
}
