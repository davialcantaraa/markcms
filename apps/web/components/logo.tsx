import Link from "next/link"

import { SITE_CONFIG } from "@/config/site"

import { Icons } from "./icons"

export const Logo = () => {
  return (
    <Link
      href="/home"
      className="hidden items-center space-x-2 text-primary md:flex"
    >
      <Icons.logo className="h-6 w-6 stroke-current" />
      <span className="hidden font-bold sm:inline-block">
        {SITE_CONFIG.shortName}
      </span>
    </Link>
  )
}
