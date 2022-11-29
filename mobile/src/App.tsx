import { trpc } from '@shared/services/trpc';
import { getAuthToken } from '@shared/utils/getAuthToken';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import { Routes } from './Routes';

export function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      httpBatchLink({
        url: 'http://192.168.1.12:3333/trpc',
        async headers() {
          return {
            Authorization: await getAuthToken()
          }
        }
      })
    ]
  }))

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <Routes />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
