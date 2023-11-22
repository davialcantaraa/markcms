"use client"

import { Content } from "database"

import { Icons } from "../icons"
import { MarkdownEditor } from "../markdown/markdown-editor"
import { MarkdownPreview } from "../markdown/markdown-preview"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet"

interface Props {
  markdown: string
  content: Content
}

export const ContentMarkdownSheet = ({ content, markdown }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" disabled={!markdown}>
          <Icons.file size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-0">
        <SheetHeader className="px-6">
          <SheetTitle>Markdown preview</SheetTitle>
          <SheetDescription>
            Seeing{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold">
              {content.id}
            </code>{" "}
            markdown preview.
          </SheetDescription>
        </SheetHeader>
        <div className="pt-8">
          <MarkdownEditor
            markdown={markdown}
            onCodeChange={() => {}}
            className="border-none"
            editorProps={{
              options: {
                readOnly: true,
                domReadOnly: true,
                selectionHighlight: false,
              },
            }}
          />
          <Separator />
          <MarkdownPreview
            code={String(markdown)}
            className="border-none border-t"
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
