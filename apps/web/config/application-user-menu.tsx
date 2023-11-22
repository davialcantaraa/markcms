import { Home, ListChecks, User } from "lucide-react"

export const applicationUserMenu = [
  {
    label: "Homepage",
    url: "/home",
    icon: <Home height={16} width={16} className="mr-2" />,
  },
  {
    label: "Onboarding",
    url: "/onboarding",
    icon: <ListChecks height={16} width={16} className="mr-2" />,
  },
  {
    label: "Profile",
    url: "/profile",
    icon: <User height={16} width={16} className="mr-2" />,
  },
]
