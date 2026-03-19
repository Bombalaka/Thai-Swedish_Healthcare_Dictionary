namespace ThaiSwedishDictionary.Domain.Entities;

public class Source
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string? Description { get; set; }

    public ICollection<Term> Terms { get; set; } = new List<Term>();
}
