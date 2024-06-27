import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import COMPANY from "@/constants/company";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FONT from "@/constants/font";
import Providers from "./providers";

export const metadata: Metadata = {
  title: COMPANY.title,
  description: COMPANY.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased grid grid-rows-[auto,1fr,auto]",
            FONT.variable
          )}
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
