import { JetBrains_Mono as FontMono, Inter as FontSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["ui-sans-serif", "system-ui"],
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
