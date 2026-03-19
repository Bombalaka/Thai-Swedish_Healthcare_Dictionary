using Microsoft.EntityFrameworkCore;
using ThaiSwedishDictionary.Domain.Entities;
using ThaiSwedishDictionary.Domain.Repositories;
using ThaiSwedishDictionary.Infrastructure.Data;

namespace ThaiSwedishDictionary.Infrastructure.Repositories;

public class SourceRepository : ISourceRepository
{
    private readonly DictionaryDbContext _context;

    public SourceRepository(DictionaryDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Source>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await _context.Sources
            .OrderBy(s => s.Name)
            .ToListAsync(cancellationToken);
    }
}
