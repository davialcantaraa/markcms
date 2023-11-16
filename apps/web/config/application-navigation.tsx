import { Component, Home, Lock } from "lucide-react"

export type ApplicationNavigation = typeof applicationNavigation

export const applicationNavigation = [
  {
    label: "Overview",
    url: "/overview",
    icon: <Home height={16} width={16} />,
  },
  {
    label: "Models",
    url: "/models",
    icon: <Component height={16} width={16} />,
  },
  {
    label: "API Keys",
    url: "/api-keys",
    icon: <Lock height={16} width={16} />,
  },
]
