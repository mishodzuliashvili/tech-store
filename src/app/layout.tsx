import type { Metadata } from "next";
import "@/styles/globals.css";
import { Navbar, Footer } from "@/components/common";
import FONT from "@/constants/font";
import { cn } from "@/utils/cn";
import { Toaster } from "react-hot-toast";
import { ROOT_METADATA } from "@/constants/root-metadata";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import getCurrentUser from "@/actions/users/get-current-user";
import { main, mainPro } from "../../prisma/seed";

export const metadata: Metadata = ROOT_METADATA;

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRes = await getCurrentUser();
  // await main();
  // await mainPro();
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased grid grid-rows-[auto,1fr,auto]"
          // FONT.variable
        )}
      >
        <Navbar
          isUserAdmin={userRes.success && userRes.data.role === "ADMIN"}
        />
        <main>
          <MantineProvider>{children}</MantineProvider>
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  );
}
