import { Edit2, Home, Lock, Settings } from "lucide-react"


export type ApplicationNavigation = typeof applicationNavigation

export const applicationNavigation = [
  {
    label: "Overview",
    url: "/overview",
    icon: <Home height={16} width={16}/>
  },
  {
    label: "Content",
    url: "/content",
    icon: <Edit2 height={16} width={16} />,
  },
  {
    label: "API Keys",
    url: "/api-keys",
    icon: <Lock height={16} width={16} />,
  },
  {
    label: "Settings",
    url: "/settings",
    icon: <Settings height={16} width={16} />,
  },
]
