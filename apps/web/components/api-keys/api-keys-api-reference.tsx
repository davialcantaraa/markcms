"use client"

import { useApiKeyStore } from "@/stores/api-key-store"

import { API_KEYS_API_REFERENCE } from "@/config/api-references/api-keys-api-reference"
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

export const ApiKeysApiReference = () => {
  const { apiKey } = useApiKeyStore()

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
          <SheetTitle>API Keys API Reference</SheetTitle>
          <SheetDescription>Reference for API Keys</SheetDescription>
        </SheetHeader>
        <ScrollArea className="reference-sheet-scroll-area h-screen w-full overflow-x-scroll pb-16">
          {API_KEYS_API_REFERENCE.sections.map((section) => (
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
                      code={option.generateCode()}
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
