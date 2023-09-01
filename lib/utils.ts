import { clsx, type ClassValue } from "clsx"
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
