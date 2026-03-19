namespace ThaiSwedishDictionary.Domain.Entities;

public class Category
{
    public int Id { get; set; }
    public string NameTh { get; set; } = string.Empty;
    public string NameSv { get; set; } = string.Empty;
    public int? ParentId { get; set; }
    public int SortOrder { get; set; }

    public Category? Parent { get; set; }
    public ICollection<Category> Children { get; set; } = new List<Category>();
    public ICollection<Term> Terms { get; set; } = new List<Term>();
}
