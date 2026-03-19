import { Container, Heading, Text } from "@chakra-ui/react";

export const dynamic = "force-dynamic";
import { getSources } from "@/lib/api";
import { SourceList } from "@/components/SourceList";

export default async function SourcesPage() {
  const sources = await getSources();

  return (
    <Container maxW="container.xl">
      <Heading size="lg" color="#0f766e" mb={6} fontWeight="bold">
        Källor
      </Heading>
      <Text color="var(--text-secondary)" mb={6}>
        Externa referenser för medicinska termer och sjukdomar.
      </Text>
      <SourceList sources={sources} />
    </Container>
  );
}
