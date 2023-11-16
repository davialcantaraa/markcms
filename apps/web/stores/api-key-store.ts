import { create } from "zustand"

type State = {
  token: string
  viewApiOpen: boolean
}
type Action = {
  toggleOpen: () => void
  setToken: (data: string) => void
}

export const useApiKeyStore = create<State & Action>((set) => ({
  token: "",
  viewApiOpen: false,
  toggleOpen: () => set((state) => ({ viewApiOpen: !state.viewApiOpen })),
  setToken: (data: string) => set(() => ({ token: data })),
}))
