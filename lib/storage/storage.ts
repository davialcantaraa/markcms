export const storage = {
  ...localStorage,
  setItem: (key: string, value: string) => localStorage.setItem(key, value),
  getItem: (key: string) => localStorage.getItem(key),
  removeItem: (key: string) => localStorage.removeItem(key),
}
