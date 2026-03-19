"use client";

import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ColorModeButton } from "@/components/ui/color-mode";
import { HomeIcon, CategoriesIcon, SourcesIcon } from "./NavIcons";

const navItems = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/categories", label: "Kategorier", Icon: CategoriesIcon },
  { href: "/sources", label: "Källor", Icon: SourcesIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      as="aside"
      w="240px"
      minH="100vh"
      flexShrink={0}
      display="flex"
      flexDirection="column"
      className="glass-sidebar"
      py={4}
      px={4}
    >
      <Link href="/">
        <Box mb={5}>
          <HStack gap={3} mb={1}>
            <Box
              w={10}
              h={10}
              borderRadius="lg"
              bg="#0f766e"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <svg
                width="22"
                height="22"
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
            <Box>
              <HStack gap={2} align="center">
                <Text fontWeight="bold" fontSize="xl" color="var(--text-primary)" letterSpacing="-0.02em">
                  THAI-SWE
                </Text>
                <Text fontSize="md" title="Thai">🇹🇭</Text>
              </HStack>
              <Text fontSize="xs" color="var(--text-secondary)" fontWeight="500">
                HEALTHCARE DICTIONARY
              </Text>
            </Box>
          </HStack>
        </Box>
      </Link>

      <Stack gap={0}>
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          const Icon = item.Icon;
          return (
            <Link key={item.href} href={item.href}>
              <HStack
                gap={3}
                px={4}
                py={4}
                borderRadius="lg"
                bg={isActive ? "#0f766e" : "transparent"}
                color={isActive ? "white" : "var(--text-primary)"}
                _hover={{
                  bg: isActive ? "#0d5d56" : "var(--sidebar-hover)",
                }}
                transition="all 0.2s"
              >
                <Icon size={18} />
                <Text fontWeight="500" fontSize="sm">
                  {item.label}
                </Text>
              </HStack>
            </Link>
          );
        })}
      </Stack>

      <Box mt="auto" pt={4} borderTopWidth="1px" borderColor="var(--sidebar-border)">
        <ColorModeButton />
      </Box>
    </Box>
  );
}
