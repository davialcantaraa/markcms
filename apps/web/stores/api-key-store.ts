import { ApiKey } from "database"
import { create } from "zustand"

type State = {
  token: string
  apiKey: ApiKey | null
  viewApiOpen: boolean
}
type Action = {
  toggleOpen: () => void
  setToken: (data: string) => void
}

export const useApiKeyStore = create<State & Action>((set) => ({
  token: "",
  apiKey: null,
  viewApiOpen: false,
  toggleOpen: () => set((state) => ({ viewApiOpen: !state.viewApiOpen })),
  setToken: (data: string) => set(() => ({ token: data })),
}))
