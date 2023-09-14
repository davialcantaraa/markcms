"use client"

import { useState } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

import { EditorCodeType } from "@/types/content"

import { MarkdownEditor } from "../markdown/markdown-editor"
import { MarkdownPreview } from "../markdown/markdown-preview"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

interface Props {
  field: ControllerRenderProps<FieldValues, string>
}

export const ContentFormMarkdown = ({ field }: Props) => {
  const [codes, setCodes] = useState([])
  return (
    <FormItem>
      <div className="flex justify-between">
        <FormLabel>{field.name}</FormLabel>
        <Tabs defaultValue="account" value="account">
          <TabsList>
            <TabsTrigger value="account">Markdown</TabsTrigger>
            <TabsTrigger value="password">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <FormControl>
        <MarkdownEditor
          markdown={field.value}
          loading={false}
          onCodeChange={() => {}}
          // onCodeChange={(code) => {
          //   setCodes((prev) => {
          //     return prev.map((prevCode: PrevCodeType) => {
          //       if (prevCode.section_id === editorActiveSection) {
          //         return {
          //           ...prevCode,
          //           content: code,
          //         }
          //       }
          //       return prevCode
          //     })
          //   })
          // }}
          {...field}
        />
        <MarkdownPreview
          loading={false}
          code={codes.map((code: EditorCodeType) => code.content).join("\n\n")}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
