"use client"

import Editor, { OnMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"

import "@/styles/markdown.css"

import { monacoInstanceType } from "@/types"

import { MarkdownSkeleton } from "./markdown-skeleton"

interface Props {
  markdown: string
  onCodeChange: (value: string) => void
  loading: boolean
}

export const MarkdownEditor = ({ markdown, onCodeChange, loading }: Props) => {
  const { theme } = useTheme()

  const editorMount: OnMount = (editorL: monacoInstanceType) => {
    console.log(editorL)
  }

  const handleEditorChange = (value: string | undefined) => {
    onCodeChange(value || "")
  }

  return (
    <div className="relative flex h-96 w-full rounded-md border border-input bg-transparent">
      {loading && <MarkdownSkeleton className="px-14" />}

      <Editor
        language="markdown"
        value={markdown}
        onMount={editorMount}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        loading={<MarkdownSkeleton className="px-14" />}
        onChange={handleEditorChange}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          wrappingIndent: "indent",
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
          lineNumbers: "off",
          overviewRulerLanes: 0,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          glyphMargin: false,
          folding: false,
          renderLineHighlight: "none",
          fontSize: 14,
          padding: {
            top: 24,
            bottom: 650,
          },
          cursorBlinking: "smooth",
          dragAndDrop: true,
        }}
        className="px-4"
      />
    </div>
  )
}
