"use client"

import { ContentModel } from "@prisma/client"
import { useRef } from "react"

import { useModelStore } from "./model-store"

interface Props {
  model: ContentModel
}

export const ModelStoreInitializer = ({ model }: Props) => {
  const initialized = useRef(false)
  if (!initialized.current) {
    useModelStore.setState({ model })
    initialized.current = true
  }
  return null
}
