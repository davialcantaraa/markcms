import "@/styles/markdown.css"

import { useEffect, useRef } from "react"

import { ParseMarkdown } from "./parse-markdown"

interface Props {
  code: string
}

export const MarkdownPreview = ({ code }: Props) => {
  const previewSectionRef = useRef<HTMLDivElement | null>(null)
  const mPos = useRef<number | null>(null)

  useEffect(() => {
    const panel = previewSectionRef.current

    const resize = (e: MouseEvent) => {
      if (mPos.current !== null && panel) {
        const dx = mPos.current - e.x
        mPos.current = e.x
        panel.style.width = `${parseInt(getComputedStyle(panel).width) + dx}px`
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      if (e.offsetX < 4) {
        mPos.current = e.x
        document.addEventListener("mousemove", resize)
      }
    }

    const handleMouseUp = () => {
      mPos.current = null
      document.removeEventListener("mousemove", resize)
    }

    panel?.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      panel?.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", resize)
    }
  }, [])

  return (
    <div
      ref={previewSectionRef}
      className="relative h-96 w-full rounded-md border border-input bg-transparent px-6"
    >
      <div className="absolute left-0 top-0 h-full w-1 cursor-ew-resize"></div>
      <ParseMarkdown code={code} codeCopyable />
    </div>
  )
}
