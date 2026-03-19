"use client";

import { Box, Button, Text } from "@chakra-ui/react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minH="50vh"
      gap={4}
      p={8}
    >
      <Text fontSize="lg" color="gray.700">
        {error.message.includes("Backend is starting up")
          ? "The server is starting up. This can take up to a minute on first visit."
          : "Something went wrong. The server may be starting up."}
      </Text>
      <Button colorScheme="blue" onClick={reset}>
        Try again
      </Button>
    </Box>
  );
}
