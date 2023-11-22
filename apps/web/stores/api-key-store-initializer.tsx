"use client"

import { ApiKey } from "database"
import { useRef } from "react"

import { useApiKeyStore } from "./api-key-store"

interface Props {
  apiKey: ApiKey
}

export const ApiKeyStoreInitializer = ({ apiKey }: Props) => {
  const initialized = useRef(false)
  if (!initialized.current) {
    useApiKeyStore.setState({ apiKey })
    initialized.current = true
  }
  return null
}
