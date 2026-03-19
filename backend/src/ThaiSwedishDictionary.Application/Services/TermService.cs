using System.Globalization;
using System.Text;
using CsvHelper;
using CsvHelper.Configuration;
using ThaiSwedishDictionary.Application.DTOs;
using ThaiSwedishDictionary.Domain.Entities;
using ThaiSwedishDictionary.Domain.Repositories;

namespace ThaiSwedishDictionary.Application.Services;

public class TermService : ITermService
{
    private readonly ITermRepository _termRepository;

    public TermService(ITermRepository termRepository)
    {
        _termRepository = termRepository;
    }

    public async Task<IReadOnlyList<TermDto>> SearchAsync(string swedishWord, int? categoryId, CancellationToken cancellationToken = default)
    {
        var terms = await _termRepository.SearchAsync(swedishWord, categoryId, cancellationToken);
        return terms.Select(MapToDto).ToList();
    }

    public async Task<TermDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var term = await _termRepository.GetByIdAsync(id, cancellationToken);
        return term is null ? null : MapToDto(term);
    }

    public async Task<IReadOnlyList<TermDto>> GetByCategoryIdAsync(int categoryId, CancellationToken cancellationToken = default)
    {
        var terms = await _termRepository.GetByCategoryIdAsync(categoryId, cancellationToken);
        return terms.Select(MapToDto).ToList();
    }

    public async Task<IReadOnlyList<TermDto>> GetRandomAsync(int limit, CancellationToken cancellationToken = default)
    {
        var terms = await _termRepository.GetRandomAsync(limit, cancellationToken);
        return terms.Select(MapToDto).ToList();
    }

    public async Task<ImportResult> ImportFromCsvAsync(Stream csvStream, CancellationToken cancellationToken = default)
    {
        var errors = new List<string>();
        var termsToAdd = new List<Term>();
        var skippedCount = 0;

        var config = new CsvConfiguration(CultureInfo.InvariantCulture)
        {
            HasHeaderRecord = true,
            MissingFieldFound = null,
            BadDataFound = null,
            HeaderValidated = null, // Allow CSV without # category_id and # source_id (they default to 1)
        };

        using var reader = new StreamReader(csvStream, Encoding.UTF8);
        using var csv = new CsvReader(reader, config);

        var records = csv.GetRecords<CsvTermRow>();

        foreach (var row in records)
        {
            var swedishWord = row.SwedishTerm?.Trim();
            var thaiWord = row.ThaiTranslation?.Trim();

            if (string.IsNullOrWhiteSpace(swedishWord) || string.IsNullOrWhiteSpace(thaiWord))
            {
                skippedCount++;
                continue;
            }

            var categoryId = ParseInt(row.CategoryIdRaw, 1);
            var sourceId = ParseInt(row.SourceIdRaw, 1);
            var definitionTh = row.DefinitionContext?.Trim() ?? thaiWord;
            var contextExample = string.IsNullOrWhiteSpace(row.ContextExample) ? null : row.ContextExample.Trim();

            termsToAdd.Add(new Term
            {
                SwedishWord = swedishWord,
                ThaiWord = thaiWord,
                DefinitionTh = definitionTh,
                CategoryId = categoryId,
                SourceId = sourceId,
                ContextExample = contextExample,
                CreatedAt = DateTime.UtcNow,
            });
        }

        if (termsToAdd.Count > 0)
        {
            await _termRepository.AddRangeAsync(termsToAdd, cancellationToken);
        }

        return new ImportResult(termsToAdd.Count, skippedCount, errors);
    }

    private static int ParseInt(string? value, int defaultValue)
    {
        if (string.IsNullOrWhiteSpace(value)) return defaultValue;
        return int.TryParse(value.Trim(), out var result) ? result : defaultValue;
    }

    private static TermDto MapToDto(Domain.Entities.Term term)
    {
        return new TermDto(
            term.Id,
            term.SwedishWord,
            term.ThaiWord,
            term.DefinitionTh,
            term.CategoryId,
            term.Category?.NameSv,
            term.Category?.NameTh,
            term.ContextExample,
            term.SourceId,
            term.Source?.Name,
            term.CreatedAt
        );
    }
}
