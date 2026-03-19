"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { Term } from "@/lib/api";

interface TermCardProps {
  term: Term;
}

export function TermCard({ term }: TermCardProps) {
  return (
    <Link href={`/terms/${term.id}`}>
      <Box
        p={5}
        cursor="pointer"
        bg="var(--card-bg)"
        borderRadius="xl"
        boxShadow="0 2px 12px rgba(0,0,0,0.06)"
        borderWidth="1px"
        borderColor="var(--input-border)"
        _hover={{
          borderColor: "#0f766e",
          boxShadow: "0 4px 20px rgba(15, 118, 110, 0.12)",
        }}
        transition="all 0.2s"
      >
        <Text
          fontWeight="bold"
          fontSize="xl"
          color="var(--text-primary)"
          letterSpacing="0.02em"
          mb={2}
        >
          {term.swedishWord.toUpperCase()}
        </Text>
        <Text color="#0f766e" fontSize="md" fontWeight="600" mb={3}>
          {term.thaiWord}
          {term.categoryNameTh && ` (${term.categoryNameTh})`}
        </Text>
        <Text fontSize="xs" color="var(--text-secondary)" mb={2}>
          Medical Specialty
        </Text>
        <HStack gap={2} flexWrap="wrap">
          {term.categoryNameSv && (
            <Box
              px={3}
              py={1}
              borderRadius="full"
              bg="var(--tag-bg)"
              color="var(--tag-color)"
              fontSize="xs"
              fontWeight="600"
            >
              [{term.categoryNameSv}]
            </Box>
          )}
        </HStack>
      </Box>
    </Link>
  );
}
