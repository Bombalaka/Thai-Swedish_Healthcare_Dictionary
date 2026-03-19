"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/">
      <HStack gap={2} _hover={{ opacity: 0.9 }}>
        <Box
          w={9}
          h={9}
          flexShrink={0}
          borderRadius="lg"
          bg="#0f766e"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5v14M6 12h12"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="2.5" fill="white" />
          </svg>
        </Box>
        <Text
          fontWeight="bold"
          fontSize="lg"
          color="#0f766e"
          letterSpacing="-0.02em"
        >
          TH-SE Dictionary
        </Text>
      </HStack>
    </Link>
  );
}
