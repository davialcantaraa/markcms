"use client"

import { PropsWithChildren } from "react"

export const ApiKeyToken = ({ children }: PropsWithChildren) => {
  return (
    <code className="relative w-fit rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {String(children).slice(0, 11).concat("...")}
    </code>
  )
}
