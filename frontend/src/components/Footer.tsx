"use client";

import { Box, Container, Text } from "@chakra-ui/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      mt="auto"
      py={4}
      borderTopWidth="1px"
      borderColor="var(--sidebar-border)"
      bg="transparent"
    >
      <Container maxW="container.xl">
        <Text fontSize="xs" color="var(--text-secondary)" textAlign="center">
          © {currentYear} Thai-Swedish Healthcare Dictionary
        </Text>
      </Container>
    </Box>
  );
}
