using ThaiSwedishDictionary.Application.DTOs;
using ThaiSwedishDictionary.Domain.Repositories;

namespace ThaiSwedishDictionary.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IReadOnlyList<CategoryDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var categories = await _categoryRepository.GetAllAsync(cancellationToken);
        return categories.Select(MapToDto).ToList();
    }

    public async Task<CategoryDto?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var category = await _categoryRepository.GetByIdAsync(id, cancellationToken);
        return category is null ? null : MapToDto(category);
    }

    private static CategoryDto MapToDto(Domain.Entities.Category category)
    {
        var children = category.Children
            .OrderBy(c => c.SortOrder)
            .ThenBy(c => c.NameSv)
            .Select(MapToDto)
            .ToList();

        return new CategoryDto(
            category.Id,
            category.NameTh,
            category.NameSv,
            category.ParentId,
            category.SortOrder,
            children
        );
    }
}
