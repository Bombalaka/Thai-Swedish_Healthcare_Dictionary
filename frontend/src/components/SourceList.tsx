"use client";

import { Box, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import type { Source } from "@/lib/api";

interface SourceListProps {
  sources: Source[];
}

export function SourceList({ sources }: SourceListProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
      {sources.map((source) => (
        <a
          key={source.id}
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
        <Box
          p={5}
          borderWidth="1px"
          borderColor="var(--input-border)"
          borderRadius="xl"
          bg="var(--card-bg)"
          boxShadow="0 2px 12px rgba(0,0,0,0.06)"
          _hover={{ borderColor: "#0f766e", boxShadow: "0 4px 20px rgba(15, 118, 110, 0.12)" }}
          transition="all 0.2s"
        >
          <Text fontWeight="600" color="#0f766e" fontSize="lg" _hover={{ textDecoration: "underline" }}>
            {source.name}
          </Text>
          {source.description && (
            <Text fontSize="sm" color="var(--text-secondary)" mt={2}>
              {source.description}
            </Text>
          )}
          <Text fontSize="xs" color="var(--text-secondary)" mt={1} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {source.url}
          </Text>
        </Box>
        </a>
      ))}
    </SimpleGrid>
  );
}
