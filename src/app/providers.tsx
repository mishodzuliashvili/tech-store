"use client";
import QUERY_CLIENT from "@/constants/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>{children}</QueryClientProvider>
  );
}
