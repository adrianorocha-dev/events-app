import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import superjson from 'superjson';

import { trpc } from '@shared/services/trpc';
import { getAuthToken } from '@shared/utils/getAuthToken';

import { Routes } from './Routes';

export function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() => trpc.createClient({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: 'http://192.168.1.12:3333/trpc',
        async headers() {
          return {
            Authorization: `Bearer ${await getAuthToken()}`
          }
        }
      })
    ]
  }))

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="dark" />
        <Routes />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
