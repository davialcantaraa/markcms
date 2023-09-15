"use client"

import Editor, { EditorProps, OnMount } from "@monaco-editor/react"
import { useTheme } from "next-themes"

import "@/styles/markdown.css"

import { monacoInstanceType } from "@/types"
import React from "react"

import { cn } from "@/lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  markdown: string
  onCodeChange: (value: string) => void
  editorProps?: EditorProps
}

export const MarkdownEditor = ({
  markdown,
  onCodeChange,
  className,
  editorProps,
  ...props
}: Props) => {
  const { theme } = useTheme()

  const editorMount: OnMount = (editorL: monacoInstanceType) => {
    console.log(editorL)
  }

  const handleEditorChange = (value: string | undefined) => {
    onCodeChange(value || "")
  }

  return (
    <div
      className={cn(
        "relative flex h-96 w-full rounded-md border border-input bg-transparent",
        className
      )}
      {...props}
    >
      <Editor
        language="markdown"
        value={markdown}
        onMount={editorMount}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        onChange={handleEditorChange}
        {...editorProps}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          wrappingIndent: "indent",
          scrollBeyondLastLine: false,
          stickyScroll: {
            enabled: true,
          },
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
            bottom: 24,
          },
          cursorBlinking: "smooth",
          dragAndDrop: true,
          ...editorProps?.options,
        }}
        className={cn("px-6", editorProps?.className)}
      />
    </div>
  )
}
