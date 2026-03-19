using Microsoft.EntityFrameworkCore;
using ThaiSwedishDictionary.Domain.Entities;
using ThaiSwedishDictionary.Domain.Repositories;
using ThaiSwedishDictionary.Infrastructure.Data;

namespace ThaiSwedishDictionary.Infrastructure.Repositories;

public class TermRepository : ITermRepository
{
    private readonly DictionaryDbContext _context;

    public TermRepository(DictionaryDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Term>> SearchAsync(string swedishWord, int? categoryId, CancellationToken cancellationToken = default)
    {
        var query = _context.Terms
            .Include(t => t.Category)
            .Include(t => t.Source)
            .Where(t => t.SwedishWord.ToLower().Contains(swedishWord.ToLower()));

        if (categoryId.HasValue)
        {
            query = query.Where(t => t.CategoryId == categoryId.Value);
        }

        return await query
            .OrderBy(t => t.SwedishWord)
            .ToListAsync(cancellationToken);
    }

    public async Task<Term?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await _context.Terms
            .Include(t => t.Category)
            .Include(t => t.Source)
            .FirstOrDefaultAsync(t => t.Id == id, cancellationToken);
    }

    public async Task<IEnumerable<Term>> GetByCategoryIdAsync(int categoryId, CancellationToken cancellationToken = default)
    {
        return await _context.Terms
            .Include(t => t.Category)
            .Include(t => t.Source)
            .Where(t => t.CategoryId == categoryId)
            .OrderBy(t => t.SwedishWord)
            .ToListAsync(cancellationToken);
    }

    public async Task<IEnumerable<Term>> GetRandomAsync(int limit, CancellationToken cancellationToken = default)
    {
        return await _context.Terms
            .Include(t => t.Category)
            .Include(t => t.Source)
            .OrderBy(_ => EF.Functions.Random())
            .Take(limit)
            .ToListAsync(cancellationToken);
    }

    public async Task<int> AddRangeAsync(IEnumerable<Term> terms, CancellationToken cancellationToken = default)
    {
        await _context.Terms.AddRangeAsync(terms, cancellationToken);
        return await _context.SaveChangesAsync(cancellationToken);
    }
}
