export function useEnvironment(): "server" | "client" {
  const environment = typeof window === "undefined" ? "server" : "client"

  return environment
}
