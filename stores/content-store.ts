import { Content, Field } from "@prisma/client"
import { create } from "zustand"

interface ExtendedContent extends Content {
  model: {
    fields: Field[]
    name: string
  } | null
}

type State = {
  content: ExtendedContent
}
type Action = {
  setContent: (data: ExtendedContent) => void
}

export const useContentStore = create<State & Action>((set) => ({
  content: {
    created_at: new Date(),
    creator_id: "",
    id: "",
    model_id: "",
    raw_data: {},
    updated_at: new Date(),
    model: {
      fields: [],
      name: "",
    },
  },
  setContent: (data: ExtendedContent) => set(() => ({ content: data })),
}))
