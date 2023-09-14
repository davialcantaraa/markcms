import { ContentModel } from "@prisma/client"
import { create } from "zustand"

type State = {
  model: ContentModel
}
type Action = {
  setModel: (data: ContentModel) => void
}

export const useModelStore = create<State & Action>((set) => ({
  model: {
    created_at: new Date(),
    creator_id: "",
    description: "",
    id: "",
    name: "",
    updated_at: new Date(),
  },
  setModel: (data: ContentModel) => set(() => ({ model: data })),
}))
