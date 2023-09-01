"use client"

import {
  QueryClientProvider as PrimitiveQueryClientProvider,
  QueryClient
} from "@tanstack/react-query"
import { PropsWithChildren } from "react"

export const queryClient = new QueryClient()

export function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <PrimitiveQueryClientProvider client={queryClient}>
      {children}
    </PrimitiveQueryClientProvider>
  )
}
