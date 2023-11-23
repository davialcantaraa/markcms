import { BarChart, Component, Lock } from "lucide-react"

export const APPLICATION_NAVIGATION = [
  {
    label: "Models",
    url: "/models",
    icon: <Component height={16} width={16} />,
    disabled: false,
  },
  {
    label: "API Keys",
    url: "/api-keys",
    icon: <Lock height={16} width={16} />,
    disabled: false,
  },
  {
    label: "Logs",
    url: "/logs",
    icon: <BarChart height={16} width={16} />,
    disabled: true,
    tag: "Soon",
  },
]
