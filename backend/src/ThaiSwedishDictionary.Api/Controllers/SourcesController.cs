using Microsoft.AspNetCore.Mvc;
using ThaiSwedishDictionary.Api.Models;
using ThaiSwedishDictionary.Application.Services;

namespace ThaiSwedishDictionary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SourcesController : ControllerBase
{
    private readonly ISourceService _sourceService;

    public SourcesController(ISourceService sourceService)
    {
        _sourceService = sourceService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var sources = await _sourceService.GetAllAsync(cancellationToken);
        return Ok(new ApiResponse<object>(sources, new ApiMeta(sources.Count), null));
    }
}
