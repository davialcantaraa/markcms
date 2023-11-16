import Link from "next/link"

import { NavItem } from "@/types/nav"
import { applicationConfig } from "@/config/application"
import { cn } from "@/lib/utils"

export const HomepageNavigation = () => {
  const navigationMarkup = (
    <nav className="hidden gap-6 md:flex">
      {applicationConfig.mainNav?.map(
        (item: NavItem, index) =>
          item.href && (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          )
      )}
    </nav>
  )

  return (
    <div className="flex justify-between gap-6 md:gap-10">
      {navigationMarkup}
    </div>
  )
}
