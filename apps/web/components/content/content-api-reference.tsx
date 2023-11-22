"use client"

import { useContentStore } from "@/stores/content-store"

import { CONTENT_API_REFERENCE } from "@/config/api-references/content-api-reference"

import { Icons } from "../icons"
import { MarkdownPreview } from "../markdown/markdown-preview"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export const ContentApiReference = () => {
  const { content } = useContentStore()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="fancy">
          <Icons.api className="mr-2 h-4 w-4" />
          API
        </Button>
      </SheetTrigger>
      <SheetContent className="w-1/2 max-w-none">
        <SheetHeader>
          <SheetTitle>Content API Reference</SheetTitle>
          <SheetDescription>
            Reference for{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              {content.id}
            </code>{" "}
            content
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="reference-sheet-scroll-area h-screen w-full overflow-x-scroll pb-16">
          {CONTENT_API_REFERENCE.sections.map((section) => (
            <div key={section.title} className="py-6">
              <h4 className="scroll-m-20 pb-4 text-xl font-semibold tracking-tight">
                {section.title}
              </h4>
              <p className="text-sm font-medium leading-none">
                {section.description}
              </p>
              <Tabs
                defaultValue={section.codeOptions[0].value}
                className="mt-4"
              >
                <TabsList className="w-fit">
                  {section.codeOptions.map((option) => (
                    <TabsTrigger value={option.value}>
                      {option.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {section.codeOptions.map((option) => (
                  <TabsContent value={option.value}>
                    <MarkdownPreview
                      code={option.generateCode(content.id)}
                      className="h-fit border-t border-none px-0"
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
