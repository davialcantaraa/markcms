import hljs from "highlight.js"
import { useState } from "react"

import { cn } from "@/lib/utils"

import { CopyButton } from "./copy-button"

interface Props {
  language: string
  value: string
  preClass?: string
  codeClass?: string
  copyable?: boolean
  codeWrap?: boolean
  copyOnHover?: boolean
  noCodeFont?: boolean
}

export const CodeBlock = ({
  language,
  value,
  preClass,
  codeClass,
  copyable = true,
  codeWrap = false,
  copyOnHover = false,
  noCodeFont = false,
}: Props) => {
  value = value || ""
  hljs.getLanguage(language) ? (language = language) : (language = "plaintext")
  const highlightedCode = hljs.highlight(value, { language }).value
  const [isBlockHovered, setIsBlockHovered] = useState(false)

  return (
    <pre
      className={cn(
        `relative flex w-full overflow-hidden rounded-lg ${
          value ? "border" : null
        } ${codeWrap ? "whitespace-pre-wrap" : null} `,
        preClass
      )}
      onMouseEnter={() => {
        setIsBlockHovered(true)
      }}
      onMouseLeave={() => {
        setIsBlockHovered(false)
      }}
    >
      <CopyButton
        value={value}
        copyable={copyable}
        isBlockHovered={copyOnHover ? isBlockHovered : true}
      />

      <div className="absolute -right-4 top-0 h-full w-12 bg-background blur"></div>
      <code
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
        className={cn(
          `hljs ${language} no-scrollbar min-w-full overflow-x-scroll  px-4 py-3 text-sm ${
            !noCodeFont ? "font-mono" : ""
          }`,
          codeClass
        )}
      ></code>
    </pre>
  )
}
