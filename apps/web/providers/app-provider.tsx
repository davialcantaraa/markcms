"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"
import { Toaster } from "sonner"

import { TailwindIndicator } from "@/components/tailwind-indicator"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // cacheTime: 60 * 1000,
    },
  },
})

export const AppProvider = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-center" />
      <TailwindIndicator />
      {children}
    </QueryClientProvider>
  )
}
