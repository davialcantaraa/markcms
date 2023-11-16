"use client"

import { useRef } from "react"

import { ExtendedContent, useContentStore } from "./content-store"

interface Props {
  content: ExtendedContent
}

export const ContentStoreInitializer = ({ content }: Props) => {
  const initialized = useRef(false)
  if (!initialized.current) {
    useContentStore.setState({ content })
    initialized.current = true
  }
  return null
}
