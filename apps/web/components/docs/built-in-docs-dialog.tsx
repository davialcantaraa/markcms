"use client"

import Image from "next/image"

import { Logo } from "../logo"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog"

export const BuiltInDocsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>What I do instead?</Button>
      </DialogTrigger>
      <DialogContent className="w-[1000px] !max-w-none">
        <DialogHeader>
          <span className="inline-flex gap-1">
            <Logo /> <i>Built-in</i> docs
          </span>
        </DialogHeader>
        <div className="h-full w-full rounded-md">
          <Image
            src="/built-in-docs.gif"
            width={1000}
            height={1000}
            alt="MarkCMS Built-in docs example"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
