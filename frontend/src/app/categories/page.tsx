import { Box, Container, Heading, Text } from "@chakra-ui/react";

export const dynamic = "force-dynamic";
import { getCategories, getCategoryTerms } from "@/lib/api";
import { TermCard } from "@/components/TermCard";
import { CategoryTerms } from "./CategoryTerms";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const categoryId = params.id ? parseInt(params.id, 10) : undefined;

  const categories = await getCategories();
  const terms = categoryId ? await getCategoryTerms(categoryId) : [];

  const selectedCategory = categoryId
    ? findCategory(categories, categoryId)
    : null;

  return (
    <Container maxW="container.xl">
      <Heading size="lg" color="#0f766e" mb={6} fontWeight="bold">
        Kategorier
      </Heading>
      <Text color="var(--text-secondary)" mb={6}>
        Välj en kategori för att se termer, eller använd menyn i navigeringen.
      </Text>
      <CategoryTerms
        categories={categories}
        terms={terms}
        selectedCategory={selectedCategory}
        categoryId={categoryId}
      />
    </Container>
  );
}

function findCategory(cats: { id: number; nameSv: string; children?: { id: number; nameSv: string }[] }[], id: number): string | null {
  for (const c of cats) {
    if (c.id === id) return c.nameSv;
    for (const child of c.children ?? []) {
      if (child.id === id) return child.nameSv;
    }
  }
  return null;
}
