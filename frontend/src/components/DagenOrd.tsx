"use client";

import { Box, Button, Heading, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { TermCard } from "@/components/TermCard";
import type { Term } from "@/lib/api";

interface DagenOrdProps {
  readonly terms: Term[];
}

export function DagenOrd({ terms }: DagenOrdProps) {
  const router = useRouter();
  if (terms.length === 0) return null;

  return (
    <Box mb={6}>
      <Box
        borderBottomWidth="1px"
        borderColor="var(--input-border)"
        pb={2}
        mb={4}
      >
        <HStack justify="space-between" align="center" flexWrap="wrap" gap={2}>
          <Box textAlign={{ base: "center", sm: "left" }} flex={1}>
            <Heading
              size="md"
              color="var(--text-primary)"
              fontWeight="bold"
              letterSpacing="0.05em"
            >
              DAGENS ORD
            </Heading>
            <Text fontSize="sm" color="var(--text-secondary)" mt={0.5}>
              Slumpmässiga termer att utforska
            </Text>
          </Box>
          <Button
            size="sm"
            variant="outline"
            borderColor="#0f766e"
            color="#0f766e"
            _hover={{ bg: "rgba(15, 118, 110, 0.08)" }}
            onClick={() => router.refresh()}
          >
            Nya ord
          </Button>
        </HStack>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={3}>
        {terms.map((term) => (
          <TermCard key={term.id} term={term} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
