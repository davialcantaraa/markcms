import { clsx, type ClassValue } from "clsx"
import crypto from "crypto"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStringInitials(value: string) {
  return value.slice(0, 2).toUpperCase()
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function capitalizeFirstLetter(input: string): string {
  if (input.length === 0) {
    return input
  }
  const firstLetter = input[0].toUpperCase()
  const restOfWord = input.slice(1)
  return firstLetter + restOfWord
}

export function generateApiKey(): string {
  const prefix = "cms_"
  const length = 32
  const randomBytes = crypto.randomBytes(length)
  const base64String = randomBytes.toString("base64")
  const cleanString = base64String.replace(/[^a-zA-Z0-9]/g, "")
  return prefix + cleanString
}

export function extractToken(token: string): string {
  return token.split("Bearer ")[1]
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

export function getFirstTwoLettersOfString(inputString: string): string {
  if (inputString.length < 2) {
    throw new Error("Input string must have at least two characters")
  }

  const firstTwoLetters = inputString.substring(0, 2).toUpperCase()

  return firstTwoLetters
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0"
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0"
}
