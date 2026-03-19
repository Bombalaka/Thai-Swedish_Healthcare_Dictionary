"use client";

import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  Menu,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Logo } from "@/components/Logo";
import type { Category } from "@/lib/api";

interface NavbarProps {
  categories: Category[];
}

export function Navbar({ categories }: NavbarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      router.push(`/?${params.toString()}`);
    },
    [query, router]
  );

  return (
    <Box
      as="nav"
      bg="var(--nav-bg)"
      borderBottomWidth="2px"
      borderColor="#0f766e"
      py={3}
      position="sticky"
      top={0}
      zIndex={10}
      boxShadow="0 1px 3px rgba(15, 118, 110, 0.15)"
    >
      <Container maxW="container.xl">
        <HStack gap={4} flexWrap="wrap">
          <Logo />

          <Box as="form" flex="1" minW={{ base: "100%", sm: "200px" }} onSubmit={handleSearch} display="flex" gap={2}>
            <Input
              placeholder="Sök svenska term..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="sm"
              flex="1"
              bg="var(--input-bg)"
              borderColor="var(--input-border)"
              borderWidth="1.5px"
              color="var(--input-color)"
              _placeholder={{ color: "var(--input-placeholder)", opacity: 1 }}
              _focus={{ borderColor: "#0f766e", boxShadow: "0 0 0 2px rgba(15, 118, 110, 0.2)" }}
            />
            <Button
              type="submit"
              size="sm"
              bg="#0f766e"
              color="white"
              _hover={{ bg: "#0d5d56" }}
            >
              Sök
            </Button>
          </Box>

          <Menu.Root>
            <Menu.Trigger asChild>
              <Button
                size="sm"
                variant="outline"
                borderColor="#0f766e"
                color="#0f766e"
                _hover={{ bg: "rgba(15, 118, 110, 0.08)" }}
              >
                Kategorier <span style={{ marginLeft: 4 }}>▼</span>
              </Button>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                {categories.map((cat) => (
                  <Box key={cat.id}>
                    <Menu.Item value={String(cat.id)} closeOnSelect={false}>
                      <Link href={`/categories?id=${cat.id}`}>{cat.nameSv}</Link>
                    </Menu.Item>
                    {cat.children?.map((sub) => (
                      <Menu.Item key={sub.id} value={String(sub.id)} closeOnSelect={false}>
                        <Link href={`/categories?id=${sub.id}`} style={{ paddingLeft: 32 }}>
                          {sub.nameSv}
                        </Link>
                      </Menu.Item>
                    ))}
                  </Box>
                ))}
              </Menu.Content>
            </Menu.Positioner>
          </Menu.Root>

          <Link href="/sources">
            <Button
              size="sm"
              variant="ghost"
              color="#0f766e"
              fontWeight="600"
              _hover={{ bg: "rgba(15, 118, 110, 0.08)" }}
            >
              Källor
            </Button>
          </Link>

          <ColorModeButton />
        </HStack>
      </Container>
    </Box>
  );
}
