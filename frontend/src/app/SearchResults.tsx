"use client";

import { Box, HStack, IconButton, SimpleGrid, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { TermCard } from "@/components/TermCard";
import type { Term } from "@/lib/api";

const PAGE_SIZE = 3;

interface SearchResultsProps {
  terms: Term[];
  query: string;
  showLatest?: boolean;
}

export function SearchResults({ terms, query, showLatest }: SearchResultsProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const usePagination = showLatest && terms.length > PAGE_SIZE;
  const totalPages = Math.ceil(terms.length / PAGE_SIZE);
  const paginatedTerms = usePagination
    ? terms.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    : terms;

  const goPrev = useCallback(() => setCurrentPage((p) => Math.max(1, p - 1)), []);
  const goNext = useCallback(
    () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
    [totalPages]
  );

  useEffect(() => {
    if (usePagination && currentPage > totalPages) setCurrentPage(1);
  }, [terms, usePagination, currentPage, totalPages]);
  if (!query && !showLatest) {
    return (
      <Text color="var(--text-secondary)" textAlign="center" py={6}>
        Ange en svensk term i sökfältet ovan för att börja.
      </Text>
    );
  }

  if (terms.length === 0) {
    if (query) {
      return (
        <Text color="var(--text-secondary)" textAlign="center" py={6}>
          Inga resultat hittades för &quot;{query}&quot;.
        </Text>
      );
    }
    return (
      <Box py={6} maxW="600px" mx="auto">
        <Text color="var(--text-primary)" fontSize="lg" fontWeight="600" mb={2} textAlign="center">
          Välkommen till Thai-Swedish Healthcare Dictionary
        </Text>
        <Text color="var(--text-secondary)" textAlign="center" lineHeight="1.7">
          Denna ordbok hjälper vårdpersonal och medicinska översättare att hitta thailändska översättningar av svenska medicinska termer. Sök i fältet ovan efter en svensk term (t.ex. &quot;hjärta&quot;, &quot;feber&quot;) eller bläddra bland kategorierna för att utforska termer inom anatomi, sjukdomar, läkemedel med mera.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize="sm" color="var(--text-secondary)" mb={3}>
        {query ? `${terms.length} resultat` : "Latest Term"}
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
        {paginatedTerms.map((term) => (
          <TermCard key={term.id} term={term} />
        ))}
      </SimpleGrid>
      {usePagination && (
        <HStack justify="center" gap={2} mt={4}>
          <IconButton
            aria-label="Previous page"
            size="sm"
            variant="outline"
            borderColor="#0f766e"
            color="#0f766e"
            _hover={{ bg: "rgba(15, 118, 110, 0.08)" }}
            onClick={goPrev}
            disabled={currentPage <= 1}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconButton>
          <Text fontSize="sm" color="var(--text-secondary)">
            {currentPage} / {totalPages}
          </Text>
          <IconButton
            aria-label="Next page"
            size="sm"
            variant="outline"
            borderColor="#0f766e"
            color="#0f766e"
            _hover={{ bg: "rgba(15, 118, 110, 0.08)" }}
            onClick={goNext}
            disabled={currentPage >= totalPages}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconButton>
        </HStack>
      )}
    </Box>
  );
}
