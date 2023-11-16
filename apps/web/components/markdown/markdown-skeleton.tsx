import React from "react"

import { cn } from "@/lib/utils"

import { Skeleton } from "../ui/skeleton"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  props?: any
  className?: any
}

export const MarkdownSkeleton = ({ props, className }: Props) => {
  return (
    <div
      className={cn("absolute top-0 w-full space-y-2 py-12", className)}
      {...props}
    >
      <Skeleton className="h-6 w-2/5" />
      <Skeleton className="h-8 w-[60%]" />
      <Skeleton className="h-8 w-[60%]" />
    </div>
  )
}
