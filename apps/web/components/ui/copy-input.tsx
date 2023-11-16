"use client"

import * as React from "react"
import { useCopyToClipboard } from "react-use"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { Button } from "./button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

export interface CopyInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const CopyInput = React.forwardRef<HTMLInputElement, CopyInputProps>(
  ({ className, type, value, ...props }, ref) => {
    const [copied, copy] = useCopyToClipboard()

    return (
      <div className="relative flex items-center justify-end">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          value={value}
          {...props}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                className="absolute mr-1"
                size="sm"
                onClick={() => copy(String(value))}
              >
                <Icons.copy size={16} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy to clipboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }
)
CopyInput.displayName = "CopyInput"

export { CopyInput }
