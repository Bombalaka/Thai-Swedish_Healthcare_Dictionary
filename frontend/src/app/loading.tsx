import { Box, Spinner, Text } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      minH="40vh"
      gap={4}
    >
      <Spinner size="xl" />
      <Text color="gray.600">
        Loading... First visit may take up to a minute while the server starts.
      </Text>
    </Box>
  );
}
