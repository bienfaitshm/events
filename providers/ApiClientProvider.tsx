import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            suspense: true,
        },
    },
});

export default function ApiClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
