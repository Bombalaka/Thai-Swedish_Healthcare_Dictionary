using Microsoft.AspNetCore.Mvc;
using ThaiSwedishDictionary.Api.Models;
using ThaiSwedishDictionary.Application.Services;

namespace ThaiSwedishDictionary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly ITermService _termService;

    public CategoriesController(ICategoryService categoryService, ITermService termService)
    {
        _categoryService = categoryService;
        _termService = termService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var categories = await _categoryService.GetAllAsync(cancellationToken);
        return Ok(new ApiResponse<object>(categories, new ApiMeta(categories.Count), null));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var category = await _categoryService.GetByIdAsync(id, cancellationToken);
        if (category is null)
            return NotFound(new ApiResponse<object>(null, null, new[] { "Category not found" }));

        return Ok(new ApiResponse<object>(category, null, null));
    }

    [HttpGet("{id:int}/terms")]
    public async Task<IActionResult> GetTerms(int id, CancellationToken cancellationToken)
    {
        var terms = await _termService.GetByCategoryIdAsync(id, cancellationToken);
        return Ok(new ApiResponse<object>(terms, new ApiMeta(terms.Count), null));
    }
}
