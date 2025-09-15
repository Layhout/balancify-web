'use client'

import { store } from '@/repositories'
import { Provider } from 'jotai'
import { keepPreviousData, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
      onError: (error) => {
        toast(error.message)
      },
    },
    queries: {
      retry: false,
      retryOnMount: false,
      staleTime: Infinity,
      placeholderData: keepPreviousData,
      throwOnError(error) {
        console.error('queryClient', error)
        toast(error.message)
        return false
      },
    },
  },
  // mutationCache: new MutationCache({
  //   // onSuccess: (res) => onUnauthorized(res as ResponseResult),
  // }),
  // queryCache: new QueryCache({
  //   // onSuccess: (res) => onUnauthorized(res as ResponseResult),
  // }),
})

export function JotaiProviders({
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
