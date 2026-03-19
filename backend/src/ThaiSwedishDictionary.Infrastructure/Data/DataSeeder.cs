using Microsoft.EntityFrameworkCore;
using ThaiSwedishDictionary.Domain.Entities;

namespace ThaiSwedishDictionary.Infrastructure.Data;

public static class DataSeeder
{
    public static async Task SeedAsync(DictionaryDbContext context)
    {
        if (await context.Categories.AnyAsync())
            return;

        var sources = new[]
        {
            new Source { Id = 1, Name = "Läkemedelsverket", Url = "https://www.lakemedelsverket.se", Description = "Swedish Medical Products Agency" },
            new Source { Id = 2, Name = "1177 Vårdguiden", Url = "https://www.1177.se", Description = "Swedish healthcare guide" },
            new Source { Id = 3, Name = "Socialstyrelsen", Url = "https://www.socialstyrelsen.se", Description = "National Board of Health and Welfare" }
        };
        context.Sources.AddRange(sources);

        var categories = new[]
        {
            new Category { Id = 1, NameTh = "กายวิภาคศาสตร์", NameSv = "Anatomi", ParentId = null, SortOrder = 1 },
            new Category { Id = 2, NameTh = "โรค", NameSv = "Sjukdomar", ParentId = null, SortOrder = 2 },
            new Category { Id = 3, NameTh = "ยา", NameSv = "Läkemedel", ParentId = null, SortOrder = 3 },
            new Category { Id = 4, NameTh = "หัตถการ", NameSv = "Procedurer", ParentId = null, SortOrder = 4 },
            new Category { Id = 5, NameTh = "อาการ", NameSv = "Symtom", ParentId = null, SortOrder = 5 },
            new Category { Id = 6, NameTh = "อุปกรณ์ทางการแพทย์", NameSv = "Medicinsk utrustning", ParentId = null, SortOrder = 6 },
            new Category { Id = 7, NameTh = "ระบบหัวใจและหลอดเลือด", NameSv = "Kardiovaskulärt", ParentId = 1, SortOrder = 1 },
            new Category { Id = 8, NameTh = "ระบบทางเดินหายใจ", NameSv = "Respiratoriskt", ParentId = 1, SortOrder = 2 },
            new Category { Id = 9, NameTh = "ระบบย่อยอาหาร", NameSv = "Matspjälkningssystemet", ParentId = 1, SortOrder = 3 },
            new Category { Id = 10, NameTh = "ระบบกล้ามเนื้อและกระดูก", NameSv = "Muskuloskelettalt", ParentId = 1, SortOrder = 4 },
            new Category { Id = 11, NameTh = "ระบบประสาท", NameSv = "Nervsystemet", ParentId = 1, SortOrder = 5 }
        };
        context.Categories.AddRange(categories);

        var terms = new[]
        {
            new Term { Id = 1, SwedishWord = "hjärta", ThaiWord = "หัวใจ", DefinitionTh = "อวัยวะที่ทำหน้าที่สูบฉีดเลือดไปทั่วร่างกาย", CategoryId = 7, ContextExample = "Patienten har problem med hjärtat.", SourceId = 1, CreatedAt = DateTime.UtcNow },
            new Term { Id = 2, SwedishWord = "blodtryck", ThaiWord = "ความดันเลือด", DefinitionTh = "แรงดันของเลือดที่กระทบผนังหลอดเลือด", CategoryId = 7, ContextExample = "Blodtrycket är för högt.", SourceId = 2, CreatedAt = DateTime.UtcNow },
            new Term { Id = 3, SwedishWord = "luftrör", ThaiWord = "หลอดลม", DefinitionTh = "ท่อที่นำอากาศจากคอไปยังปอด", CategoryId = 8, ContextExample = "Luftröret är inflammerat.", SourceId = 2, CreatedAt = DateTime.UtcNow },
            new Term { Id = 4, SwedishWord = "feber", ThaiWord = "ไข้", DefinitionTh = "อุณหภูมิร่างกายสูงกว่าปกติ", CategoryId = 5, ContextExample = "Patienten har feber.", SourceId = 2, CreatedAt = DateTime.UtcNow },
            new Term { Id = 5, SwedishWord = "smärta", ThaiWord = "ความเจ็บปวด", DefinitionTh = "ความรู้สึกไม่สบายหรือเจ็บ", CategoryId = 5, ContextExample = "Patienten känner smärta i bröstet.", SourceId = 2, CreatedAt = DateTime.UtcNow },
            new Term { Id = 6, SwedishWord = "tablett", ThaiWord = "ยาเม็ด", DefinitionTh = "รูปแบบยาที่เป็นเม็ดแข็ง", CategoryId = 3, ContextExample = "Ta en tablett tre gånger om dagen.", SourceId = 1, CreatedAt = DateTime.UtcNow },
            new Term { Id = 7, SwedishWord = "injektion", ThaiWord = "การฉีดยา", DefinitionTh = "การให้ยาผ่านเข็มฉีดเข้าเส้นเลือดหรือกล้ามเนื้อ", CategoryId = 4, ContextExample = "Patienten behöver en injektion.", SourceId = 3, CreatedAt = DateTime.UtcNow },
            new Term { Id = 8, SwedishWord = "stetoskop", ThaiWord = "หูฟังตรวจ", DefinitionTh = "เครื่องมือใช้ฟังเสียงหัวใจและปอด", CategoryId = 6, ContextExample = "Läkaren använder stetoskopet.", SourceId = 3, CreatedAt = DateTime.UtcNow }
        };
        context.Terms.AddRange(terms);

        await context.SaveChangesAsync();

        await context.Database.ExecuteSqlRawAsync(
            "SELECT setval('sources_id_seq', (SELECT COALESCE(MAX(id), 1) FROM sources));");
        await context.Database.ExecuteSqlRawAsync(
            "SELECT setval('categories_id_seq', (SELECT COALESCE(MAX(id), 1) FROM categories));");
        await context.Database.ExecuteSqlRawAsync(
            "SELECT setval('terms_id_seq', (SELECT COALESCE(MAX(id), 1) FROM terms));");
    }
}
