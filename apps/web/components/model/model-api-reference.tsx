"use client"

import { useModelStore } from "@/stores/model-store"

import { MODEL_API_REFERENCE } from "@/config/model-api-reference"

import { Icons } from "../icons"
import { MarkdownPreview } from "../markdown/markdown-preview"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export const ModelApiReference = () => {
  const { model } = useModelStore()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <Icons.api className="mr-2 h-4 w-4" />
          API
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="px-6">
          <SheetTitle>Model API Reference</SheetTitle>
          <SheetDescription>
            Reference for <b>{model.name}</b> model
          </SheetDescription>
        </SheetHeader>
        {MODEL_API_REFERENCE.sections.map((section) => (
          <div key={section.title} className="py-8">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight pb-4">
              {section.title}
            </h4>
            <p className="leading-7 pb-4">
              {section.description}
            </p>
            <Tabs defaultValue="account">
              <TabsList>
                {section.codeOptions.map((option) => (
                  <TabsTrigger value={option.value}>{option.title}</TabsTrigger>
                ))}
              </TabsList>
              {section.codeOptions.map((option) => (
                <TabsContent value={option.value}>
                  <MarkdownPreview
                    code={option.generateCode(model.id)}
                    className="border-none border-t px-0"
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  )
}
