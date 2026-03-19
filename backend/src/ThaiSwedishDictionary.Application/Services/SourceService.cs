using ThaiSwedishDictionary.Application.DTOs;
using ThaiSwedishDictionary.Domain.Repositories;

namespace ThaiSwedishDictionary.Application.Services;

public class SourceService : ISourceService
{
    private readonly ISourceRepository _sourceRepository;

    public SourceService(ISourceRepository sourceRepository)
    {
        _sourceRepository = sourceRepository;
    }

    public async Task<IReadOnlyList<SourceDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var sources = await _sourceRepository.GetAllAsync(cancellationToken);
        return sources.Select(s => new SourceDto(s.Id, s.Name, s.Url, s.Description)).ToList();
    }
}
