"use client";

import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { Term } from "@/lib/api";

interface TermDetailProps {
  term: Term;
}

export function TermDetail({ term }: TermDetailProps) {
  return (
    <Box
      p={8}
      bg="var(--card-bg)"
      borderRadius="2xl"
      boxShadow="0 4px 20px rgba(0,0,0,0.06)"
      borderWidth="1px"
      borderColor="var(--input-border)"
    >
      <Stack gap={5}>
        <Box>
          <Text fontSize="xs" color="var(--text-secondary)" mb={1}>
            Svenska
          </Text>
          <Heading size="lg" color="var(--text-primary)" letterSpacing="0.02em">
            {term.swedishWord.toUpperCase()}
          </Heading>
        </Box>

        <Box>
          <Text fontSize="xs" color="var(--text-secondary)" mb={1}>
            Thai
          </Text>
          <Text fontSize="xl" color="#0f766e" fontWeight="600">
            {term.thaiWord}
            {term.categoryNameTh && ` (${term.categoryNameTh})`}
          </Text>
        </Box>

        <Box>
          <Text fontSize="xs" color="var(--text-secondary)" mb={1}>
            Definition (Thai)
          </Text>
          <Text color="var(--text-primary)">{term.definitionTh}</Text>
        </Box>

        {term.categoryNameSv && (
          <Box>
            <Text fontSize="xs" color="var(--text-secondary)" mb={1}>
              Medical Specialty
            </Text>
            <HStack gap={2}>
              <Box
                px={3}
                py={1}
                borderRadius="full"
                bg="var(--tag-bg)"
                color="var(--tag-color)"
                fontSize="sm"
                fontWeight="600"
              >
                [{term.categoryNameSv}]
              </Box>
            </HStack>
          </Box>
        )}

        {term.contextExample && (
          <Box>
            <Text fontSize="xs" color="var(--text-secondary)" mb={1}>
              Exempel
            </Text>
            <Text fontStyle="italic" color="var(--text-secondary)">
              {term.contextExample}
            </Text>
          </Box>
        )}

        {term.sourceName && (
          <Box>
            <Text fontSize="xs" color="var(--text-secondary)" mb={1}>
              Källa
            </Text>
            <Text color="var(--text-primary)" fontWeight="500">
              {term.sourceName}
            </Text>
          </Box>
        )}

        <Link href="/">
          <Text
            color="#0f766e"
            fontSize="sm"
            fontWeight="600"
            _hover={{ textDecoration: "underline" }}
            mt={2}
          >
            ← Tillbaka till sök
          </Text>
        </Link>
      </Stack>
    </Box>
  );
}
