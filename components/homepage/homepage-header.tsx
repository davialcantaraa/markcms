import { currentUser } from "@clerk/nextjs"
import { User } from "@clerk/nextjs/api"
import Link from "next/link"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { Logo } from "../logo"
import { buttonVariants } from "../ui/button"
import { HomepageNavigation } from "./homepage-navigation"

export const HomepageHeader = async () => {
  const user: User | null = await currentUser()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Logo />
        <HomepageNavigation />
        <div className="flex items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {user ? (
              <Link
                href="/overview"
                className={cn(
                  buttonVariants({
                    className: "flex gap-2 items-center",
                  })
                )}
              >
                Dashboard <Icons.home size={16} />
              </Link>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className={cn(
                    buttonVariants({
                      variant: "secondary",
                      className: "flex gap-2",
                    })
                  )}
                >
                  Login <Icons.arrowRight />
                </Link>
                <Link href="/sign-in" className={cn(buttonVariants())}>
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
