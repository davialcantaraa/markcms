"use client"

import { useUser } from "@clerk/nextjs"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import useScroll from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"

import { Logo } from "../logo"
import { buttonVariants } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

export default function SiteHeader() {
  const scrolled = useScroll(50)

  const { isSignedIn, isLoaded } = useUser()

  return (
    <header
      className={cn(
        "sticky top-0 z-30  w-full bg-transparent ",
        scrolled
          ? " h-16 border-b backdrop-blur-xl  transition-all duration-300 ease-in-out"
          : " h-20"
      )}
    >
      <div className="container h-full">
        <div className="flex h-full  items-center justify-between">
          <Logo />
          <div className=" flex items-center gap-x-2">
            {!isLoaded ? (
              <Skeleton className="h-10 w-32" />
            ) : isSignedIn ? (
              <Link href="/models" className={cn(buttonVariants({size: "sm"}))}>
                Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/sign-in"
                  className={buttonVariants({ size: "sm" })}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className={buttonVariants({ variant: "fancy", size: "sm" })}
                >
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
