import "@/styles/markdown.css"

import { cn } from "@/lib/utils"

import { ParseMarkdown } from "./parse-markdown"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  code: string
}

export const MarkdownPreview = ({ code, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "relative h-96 w-full rounded-md border border-input bg-transparent px-6 overflow-y-scroll no-scrollbar",
        className
      )}
      {...props}
    >
      <ParseMarkdown code={code} codeCopyable />
    </div>
  )
}
