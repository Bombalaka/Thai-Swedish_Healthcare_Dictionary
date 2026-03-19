"use client";

import { Box, Drawer, HStack, IconButton, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { HomeIcon, CategoriesIcon, SourcesIcon } from "./NavIcons";

const navItems = [
  { href: "/", label: "Home", Icon: HomeIcon },
  { href: "/categories", label: "Kategorier", Icon: CategoriesIcon },
  { href: "/sources", label: "Källor", Icon: SourcesIcon },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <Box display="flex" minH="100vh" bg="var(--background)">
      {/* Desktop sidebar - hidden on mobile */}
      <Box
        as="aside"
        display={{ base: "none", md: "block" }}
        w="240px"
        minH="100vh"
        flexShrink={0}
      >
        <Sidebar />
      </Box>

      {/* Mobile header - visible only on mobile */}
      <Box
        display={{ base: "block", md: "none" }}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={20}
        className="glass-mobile-header"
        px={4}
        py={3}
      >
        <HStack justify="space-between" w="full">
          <HStack gap={3}>
            <IconButton
              aria-label="Open menu"
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(true)}
              css={{
                "& svg": { width: 6, height: 6 },
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </IconButton>
            <Link href="/" onClick={closeMobileMenu}>
              <Text fontWeight="bold" fontSize="lg" color="var(--text-primary)">
                THAI-SWE
              </Text>
            </Link>
          </HStack>
          <ColorModeButton />
        </HStack>
      </Box>

      {/* Mobile drawer menu */}
      <Drawer.Root
        open={mobileMenuOpen}
        placement="start"
        size="xs"
        onOpenChange={(e) => setMobileMenuOpen(e.open)}
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header borderBottomWidth="1px" borderColor="var(--sidebar-border)">
              <HStack gap={2}>
                <Text fontWeight="bold" fontSize="xl" color="var(--text-primary)">
                  THAI-SWE
                </Text>
                <Text fontSize="md">🇹🇭</Text>
              </HStack>
              <Text fontSize="xs" color="var(--text-secondary)">
                HEALTHCARE DICTIONARY
              </Text>
            </Drawer.Header>
            <Drawer.Body p={0}>
              <Box as="nav" py={2}>
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  const Icon = item.Icon;
                  return (
                    <Link key={item.href} href={item.href} onClick={closeMobileMenu}>
                      <HStack
                        gap={3}
                        px={4}
                        py={3}
                        mx={2}
                        borderRadius="lg"
                        bg={isActive ? "#0f766e" : "transparent"}
                        color={isActive ? "white" : "var(--text-primary)"}
                        _hover={{
                          bg: isActive ? "#0d5d56" : "var(--sidebar-hover)",
                        }}
                      >
                        <Icon size={18} />
                        <Text fontWeight="500" fontSize="sm">
                          {item.label}
                        </Text>
                      </HStack>
                    </Link>
                  );
                })}
              </Box>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      {/* Main content */}
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        position="relative"
        overflow="auto"
        className="main-content-watermark"
        pt={{ base: 14, md: 0 }}
      >
        <Box position="relative" zIndex={1} p={{ base: 4, md: 8 }} pb={8} flex={1}>
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
