"use client"; // React Query needs to be inside a client component

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { queryClient } from "@/lib/queryClient";

// Define Props for TypeScript
interface QueryProviderProps {
    children: ReactNode;
}

export default function QueryProvider({ children }: QueryProviderProps) {
    const [client] = useState(() => queryClient);

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
