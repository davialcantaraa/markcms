"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { APPLICATION_NAVIGATION } from "@/config/application/application-navigation"
import { cn } from "@/lib/utils"

import { Logo } from "../logo"
import { Badge } from "../ui/badge"
import { AppUserMenu } from "./application-user-menu"

export const ApplicationSidebar = () => {
  const pathname = usePathname()

  const navigationMarkup = APPLICATION_NAVIGATION.map((item) => {
    const isCurrentUrl = pathname.startsWith(item.url)
    return (
      <li key={item.url}>
        <Link
          href={item.url}
          className={cn(
            "group flex h-8 w-full items-center justify-between rounded-md border border-transparent px-2 py-1 text-sm text-muted-foreground hover:bg-primary hover:text-secondary dark:hover:text-background ",
            isCurrentUrl && "bg-primary text-secondary dark:text-background",
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
          <Logo />
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
