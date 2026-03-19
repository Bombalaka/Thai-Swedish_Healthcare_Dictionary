import { Box, Container } from "@chakra-ui/react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
import { getCategories, searchTerms, getCategoryTerms, getRandomTerms } from "@/lib/api";
import { SearchBar } from "@/components/SearchBar";
import { SearchResults } from "./SearchResults";
import { DagenOrd } from "@/components/DagenOrd";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category_id?: string }>;
}) {
  const params = await searchParams;
  const q = params.q?.trim() ?? "";
  const categoryId = params.category_id ? parseInt(params.category_id, 10) : undefined;

  const [categories, randomTerms] = await Promise.all([
    getCategories(),
    getRandomTerms(3),
  ]);

  let terms: Awaited<ReturnType<typeof searchTerms>>;
  let showLatest = false;

  if (q) {
    terms = await searchTerms(q, categoryId);
  } else if (categoryId) {
    terms = await getCategoryTerms(categoryId);
    showLatest = true;
  } else {
    // Show "Latest Term" from first category when no search
    const firstCat = categories[0];
    terms = firstCat ? await getCategoryTerms(firstCat.id) : [];
    showLatest = true;
  }

  return (
    <Container maxW="container.xl">
      <Suspense fallback={<Box h="120px" />}>
        <SearchBar categories={categories} />
      </Suspense>
      <SearchResults terms={terms} query={q} showLatest={showLatest} />
      <Box mt={8}>
        <DagenOrd terms={randomTerms} />
      </Box>
    </Container>
  );
}
