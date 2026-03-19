# Thai-Swedish Healthcare Dictionary

Swedish → Thai dictionary for healthcare workers and medical translators. Healthcare scope only (v1).

## What It Does

- **Search** – Enter a Swedish medical term to get Thai translation(s) and definitions
- **Browse by category** – Anatomy, Diseases, Medications, Procedures, Symptoms, Medical equipment (with sub-categories)
- **Term details** – Full entry with Swedish word, Thai translation, definition, example sentence, and source
- **Source references** – Links to external medical resources

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js, Chakra UI |
| Backend | .NET 9, Clean Architecture |
| Database | PostgreSQL |
| API | REST JSON |

## How It Works

1. User enters a Swedish term in the search bar
2. Results show matching Thai translations with medical specialty tags
3. Clicking a term opens the full entry (definition, example, source)
4. Categories and Dagens Ord (random terms) support exploration

---

*Setup and deployment instructions are in [DEVELOPER.md](DEVELOPER.md).*
