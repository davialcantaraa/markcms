import { AppProvider } from "@/providers/app-provider"

import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from "next"
import { PropsWithChildren } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { SITE_CONFIG } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.shortName,
    template: `%s - ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#171717",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.className,
            fontSans.variable
          )}
        >
          <AppProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
            </ThemeProvider>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
