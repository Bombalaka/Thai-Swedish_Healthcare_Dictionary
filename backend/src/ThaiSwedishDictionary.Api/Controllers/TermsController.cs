using Microsoft.AspNetCore.Mvc;
using ThaiSwedishDictionary.Api.Models;
using ThaiSwedishDictionary.Application.Services;

namespace ThaiSwedishDictionary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TermsController : ControllerBase
{
    private readonly ITermService _termService;

    public TermsController(ITermService termService)
    {
        _termService = termService;
    }

    [HttpGet]
    public async Task<IActionResult> Search(
        [FromQuery] string? q,
        [FromQuery] int? category_id,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(q))
        {
            return Ok(new ApiResponse<object>(null, new ApiMeta(0), null));
        }

        var terms = await _termService.SearchAsync(q, category_id, cancellationToken);
        return Ok(new ApiResponse<object>(terms, new ApiMeta(terms.Count), null));
    }

    [HttpGet("random")]
    public async Task<IActionResult> GetRandom([FromQuery] int limit = 3, CancellationToken cancellationToken = default)
    {
        var terms = await _termService.GetRandomAsync(Math.Clamp(limit, 1, 10), cancellationToken);
        return Ok(new ApiResponse<object>(terms, new ApiMeta(terms.Count), null));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id, CancellationToken cancellationToken)
    {
        var term = await _termService.GetByIdAsync(id, cancellationToken);
        if (term is null)
            return NotFound(new ApiResponse<object>(null, null, new[] { "Term not found" }));

        return Ok(new ApiResponse<object>(term, null, null));
    }

    [HttpPost("import")]
    [RequestSizeLimit(5_242_880)] // 5 MB
    public async Task<IActionResult> Import(IFormFile? file, CancellationToken cancellationToken = default)
    {
        var importKey = Environment.GetEnvironmentVariable("IMPORT_API_KEY");
        if (!string.IsNullOrEmpty(importKey))
        {
            if (!Request.Headers.TryGetValue("X-Import-Key", out var providedKey) || providedKey != importKey)
                return Unauthorized(new ApiResponse<object>(null, null, new[] { "Invalid or missing X-Import-Key header" }));
        }

        if (file is null || file.Length == 0)
            return BadRequest(new ApiResponse<object>(null, null, new[] { "No file uploaded. Use form-data key 'file'." }));

        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (ext != ".csv")
            return BadRequest(new ApiResponse<object>(null, null, new[] { "File must be a CSV (.csv)" }));

        if (file.Length > 5_242_880)
            return BadRequest(new ApiResponse<object>(null, null, new[] { "File size must be under 5 MB" }));

        await using var stream = file.OpenReadStream();
        var result = await _termService.ImportFromCsvAsync(stream, cancellationToken);

        var data = new { result.ImportedCount, result.SkippedCount, result.Errors };
        return Ok(new ApiResponse<object>(data, null, null));
    }
}
