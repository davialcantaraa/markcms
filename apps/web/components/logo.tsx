import Link from "next/link"

import { applicationConfig } from "@/config/application"

import { Icons } from "./icons"

export const Logo = () => {
  return (
    <Link href="/" className="hidden items-center space-x-2 text-primary md:flex">
      <Icons.logo className="h-6 w-6 stroke-current" />
      <span className="hidden font-bold sm:inline-block">
        {applicationConfig.name}
      </span>
    </Link>
  )
}
