"use client"

import { Content } from "@prisma/client"
import { useRef } from "react"

import { useContentStore } from "./content-store"

interface Props {
  content: Content
}

export const ContentStoreInitializer = ({ content }: Props) => {
  const initialized = useRef(false)
  if (!initialized.current) {
    useContentStore.setState({ content })
    initialized.current = true
  }
  return null
}
