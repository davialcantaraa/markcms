"use client"

import { useClerk, useUser } from "@clerk/nextjs"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { applicationUserMenu } from "@/config/application-user-menu"
import { getFirstTwoLettersOfString } from "@/lib/utils"

export function AppUserMenu() {
  const router = useRouter()
  const { signOut } = useClerk()
  const { isLoaded, user } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative mx-auto mb-6 mt-auto flex w-full items-center justify-center gap-2 truncate rounded-full px-1 py-3"
        >
          {!isLoaded ? (
            <div className="h-full w-full bg-neutral-100" />
          ) : (
            <div className="flex flex-1 items-center gap-3 overflow-hidden">
              <Avatar className="h-8 w-8 border">
                <AvatarImage
                  src={user?.imageUrl}
                  alt={`Avatar de ${user?.username}`}
                />
                <AvatarFallback>
                  {getFirstTwoLettersOfString(String(user?.username))}
                </AvatarFallback>
              </Avatar>
              <p className="truncate text-sm font-medium leading-none">
                {user?.primaryEmailAddress?.toString()}
              </p>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center" forceMount>
        <DropdownMenuGroup>
          {applicationUserMenu.map((item) => (
            <DropdownMenuItem key={item.url} asChild>
              <Link href={item.url}>
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => signOut(() => router.push("/home"))}>
            <LogOut height={16} width={16} className="mr-2" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
