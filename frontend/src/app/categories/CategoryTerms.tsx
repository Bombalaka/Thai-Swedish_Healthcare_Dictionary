"use client";

import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TermCard } from "@/components/TermCard";
import type { Category, Term } from "@/lib/api";

interface CategoryTermsProps {
  categories: Category[];
  terms: Term[];
  selectedCategory: string | null;
  categoryId?: number;
}

export function CategoryTerms({
  categories,
  terms,
  selectedCategory,
  categoryId,
}: CategoryTermsProps) {
  return (
    <Stack gap={6}>
      <Box>
        <Text fontSize="sm" color="var(--text-secondary)" mb={2}>
          Huvudkategorier
        </Text>
        <Stack direction="row" flexWrap="wrap" gap={2}>
          {categories.map((cat) => (
            <Link key={cat.id} href={`/categories?id=${cat.id}`}>
              <Box
                px={4}
                py={2}
                borderRadius="xl"
                bg={categoryId === cat.id ? "rgba(15, 118, 110, 0.15)" : "var(--card-bg)"}
                borderWidth="1px"
                borderColor={categoryId === cat.id ? "#0f766e" : "var(--input-border)"}
                _hover={{ borderColor: "#0f766e", bg: "var(--sidebar-hover)" }}
                fontSize="sm"
                color="var(--text-primary)"
                fontWeight="500"
                boxShadow="0 1px 3px rgba(0,0,0,0.04)"
              >
                {cat.nameSv}
              </Box>
            </Link>
          ))}
        </Stack>
      </Box>

      {categoryId && selectedCategory && (
        <Box>
          <Text fontSize="sm" color="var(--text-secondary)" mb={4}>
            Termer i {selectedCategory}
          </Text>
          {terms.length === 0 ? (
            <Text color="var(--text-secondary)">Inga termer i denna kategori.</Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
              {terms.map((term) => (
                <TermCard key={term.id} term={term} />
              ))}
            </SimpleGrid>
          )}
        </Box>
      )}
    </Stack>
  );
}
