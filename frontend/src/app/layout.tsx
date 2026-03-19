import type { Metadata } from "next";
import { Provider } from "@/components/ui/provider";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thai-Swedish Healthcare Dictionary",
  description: "Swedish to Thai dictionary for healthcare workers and medical translators",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <AppShell>{children}</AppShell>
        </Provider>
      </body>
    </html>
  );
}
