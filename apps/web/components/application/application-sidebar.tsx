"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { applicationConfig } from "@/config/application"
import { applicationNavigation } from "@/config/application-navigation"
import { cn } from "@/lib/utils"

import { Icons } from "../icons"

export const ApplicationSidebar = () => {
  const pathname = usePathname()

  const navigationMarkup = applicationNavigation.map((item) => {
    const isCurrentUrl = pathname.startsWith(item.url)
    return (
      <li key={item.url}>
        <Link
          href={item.url}
          className={cn(
            "group flex h-8 w-full items-center gap-2 rounded-md border border-transparent px-2 py-1 text-sm text-muted-foreground hover:bg-primary hover:text-white dark:hover:text-background ",
            isCurrentUrl && "bg-primary text-white dark:text-background"
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      </li>
    )
  })

  return (
    <aside className="sticky left-0 top-0 z-40 h-screen w-60 border-r bg-background px-4">
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
    </aside>
  )
}
