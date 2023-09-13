import { z } from "zod"
import { create } from "zustand"

const schema = z.object({
  rawData: z.record(z.any()),
})

type State = z.infer<typeof schema>
type Action = {
  setRawData: (data: any) => void
}

export const useContentStore = create<State & Action>((set) => ({
  rawData: {},
  setRawData: (data: any) => set(() => ({ rawData: data })),
}))
