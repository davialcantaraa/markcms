"use client"

import { useState } from "react"
import { ControllerRenderProps, FieldValues } from "react-hook-form"

import { capitalizeFirstLetter } from "@/lib/utils"
import { MarkdownEditor } from "../markdown/markdown-editor"
import { MarkdownPreview } from "../markdown/markdown-preview"
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs"

interface Props {
  field: ControllerRenderProps<FieldValues, string>
}

export const ContentFormMarkdown = ({ field }: Props) => {
  const [tab, setTab] = useState("markdown")
  return (
    <FormItem>
      <div className="flex justify-between">
        <FormLabel>{capitalizeFirstLetter(field.name)}</FormLabel>
        <Tabs defaultValue="markdown" value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="markdown">Markdown</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <FormControl>
        <>
          {tab === "markdown" ? (
            <MarkdownEditor
              markdown={field.value}
              onCodeChange={field.onChange}
              {...field}
            />
          ) : null}
          {tab === "preview" ? (
            <MarkdownPreview code={String(field.value)} />
          ) : null}
        </>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
