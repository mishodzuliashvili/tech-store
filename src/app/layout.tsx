import type { Metadata } from "next";
import "./globals.css";
import COMPANY from "@/constants/company";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FONT from "@/constants/font";
import Providers from "./providers";
import { cn } from "@/utils/cn";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: COMPANY.title,
  description: COMPANY.description,
};

export const revalidate = 3600;

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
          <Toaster />
        </body>
      </Providers>
    </html>
  );
}
