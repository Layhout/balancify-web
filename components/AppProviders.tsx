'use client'

import { store } from '@/repositories'
import { Provider } from 'jotai'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
  mutationCache: new MutationCache({
    // onSuccess: (res) => onUnauthorized(res as ResponseResult),
  }),
  queryCache: new QueryCache({
    // onSuccess: (res) => onUnauthorized(res as ResponseResult),
  }),
})

export default function JotaiProviders({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  )
}
