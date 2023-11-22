"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { applicationConfig } from "@/config/application"
import { applicationNavigation } from "@/config/application-navigation"
import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { Badge } from "../ui/badge"
import { AppUserMenu } from "./application-user-menu"

export const ApplicationSidebar = () => {
  const pathname = usePathname()

  const navigationMarkup = applicationNavigation.map((item) => {
    const isCurrentUrl = pathname.startsWith(item.url)
    return (
      <li key={item.url}>
        <Link
          href={item.url}
          className={cn(
            "group flex h-8 w-full items-center justify-between rounded-md border border-transparent px-2 py-1 text-sm text-muted-foreground hover:bg-primary hover:text-white dark:hover:text-background ",
            isCurrentUrl && "bg-primary text-white dark:text-background",
            item.disabled &&
              "pointer-events-none cursor-not-allowed select-none hover:bg-transparent hover:text-muted-foreground"
          )}
        >
          <span className="flex items-center gap-2">
            {item.icon}
            {item.label}
          </span>
          {item.tag && <Badge>{item.tag}</Badge>}
        </Link>
      </li>
    )
  })

  return (
    <aside className="sticky left-0 top-0 z-40 h-screen w-60 flex-col justify-between border-r bg-background px-4 md:flex">
      <div className="flex flex-col items-center">
        <div className="flex h-16 w-full items-center justify-start">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo className="h-6 w-6 stroke-current" />
            <span className="hidden font-bold sm:inline-block">
              {applicationConfig.name}
            </span>
          </Link>
        </div>
        <nav className="mt-6 flex w-full flex-col gap-4">
          <ul className="grid grid-flow-row auto-rows-max gap-2 text-sm">
            {navigationMarkup}
          </ul>
        </nav>
      </div>
      <div className="flex flex-col items-center">
        <AppUserMenu />
      </div>
    </aside>
  )
}
