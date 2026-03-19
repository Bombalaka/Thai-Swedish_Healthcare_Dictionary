import { Box, Container } from "@chakra-ui/react";

export const dynamic = "force-dynamic";
import { getTerm } from "@/lib/api";
import { TermDetail } from "@/components/TermDetail";
import { notFound } from "next/navigation";

export default async function TermPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const termId = parseInt(id, 10);
  if (isNaN(termId)) notFound();

  const term = await getTerm(termId);
  if (!term) notFound();

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minH="60vh" py={8}>
      <Container maxW="container.md">
        <TermDetail term={term} />
      </Container>
    </Box>
  );
}
