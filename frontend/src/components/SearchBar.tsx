"use client";

import { Box, HStack, Input, Menu } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import type { Category } from "@/lib/api";

interface SearchBarProps {
  categories: Category[];
}

export function SearchBar({ categories }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      const catId = searchParams.get("category_id");
      if (catId) params.set("category_id", catId);
      router.push(`/?${params.toString()}`);
    },
    [query, router, searchParams]
  );

  const flatCategories = categories.flatMap((c) =>
    c.children?.length ? [c, ...c.children] : [c]
  );
  const selectedCatId = searchParams.get("category_id");
  const selectedCat = selectedCatId
    ? flatCategories.find((c) => String(c.id) === selectedCatId)
    : null;

  return (
    <Box mb={4}>
      <Box as="form" onSubmit={handleSearch} maxW={{ base: "100%", md: "600px" }} mx="auto" mb={3}>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          bg="var(--card-bg)"
          borderRadius="2xl"
          px={5}
          py={3}
          boxShadow="0 4px 14px rgba(15, 118, 110, 0.08)"
          borderWidth="1px"
          borderColor="var(--input-border)"
        >
          <Input
            placeholder='Search Swedish Term (ex. "Hjärta")...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            border="none"
            outline="none"
            flex={1}
            fontSize="md"
            color="var(--input-color)"
            _placeholder={{ color: "var(--input-placeholder)" }}
            _focus={{ boxShadow: "none" }}
          />
          <button
            type="submit"
            style={{
              cursor: "pointer",
              color: "#0f766e",
              background: "none",
              border: "none",
              padding: 0,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Search"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </Box>
      </Box>

      <HStack justify={{ base: "flex-start", sm: "flex-end" }} gap={3} flexWrap="wrap">
        <Menu.Root>
          <Menu.Trigger asChild>
            <Box
              as="button"
              px={4}
              py={2}
              borderRadius="xl"
              bg="var(--card-bg)"
              borderWidth="1px"
              borderColor="var(--input-border)"
              fontSize="sm"
              color="var(--text-primary)"
              _hover={{ borderColor: "#0f766e", color: "#0f766e" }}
              display="flex"
              alignItems="center"
              gap={2}
            >
              {selectedCat ? selectedCat.nameSv : "All Specialties"}
              <span style={{ fontSize: 10 }}>▼</span>
            </Box>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="all" asChild>
                <Link href="/">All Specialties</Link>
              </Menu.Item>
              {flatCategories.map((cat) => (
                <Menu.Item key={cat.id} value={String(cat.id)} asChild>
                  <Link href={`/?category_id=${cat.id}`}>{cat.nameSv}</Link>
                </Menu.Item>
              ))}
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>

        <Link href="/sources">
          <Box
            as="span"
            px={4}
            py={2}
            borderRadius="xl"
            bg="var(--card-bg)"
            borderWidth="1px"
            borderColor="var(--input-border)"
            fontSize="sm"
            color="var(--text-primary)"
            _hover={{ borderColor: "#0f766e", color: "#0f766e" }}
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            Sources
            <span style={{ fontSize: 10 }}>▼</span>
          </Box>
        </Link>
      </HStack>
    </Box>
  );
}
