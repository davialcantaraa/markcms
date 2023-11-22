"use client"

import { MODELS_API_REFERENCE } from "@/config/api-references/models-api-reference"

import { MarkdownPreview } from "../markdown/markdown-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

export const OnboardingModelTabs = () => {
  return (
    <Tabs
      defaultValue={MODELS_API_REFERENCE.sections[0].codeOptions[0].value}
      className="mt-4"
    >
      <TabsList className="w-fit">
        {MODELS_API_REFERENCE.sections[0].codeOptions.map((option) => (
          <TabsTrigger value={option.value}>{option.title}</TabsTrigger>
        ))}
      </TabsList>
      {MODELS_API_REFERENCE.sections[0].codeOptions.map((option) => (
        <TabsContent value={option.value}>
          <MarkdownPreview
            code={option.generateCode()}
            className="h-fit border-t border-none px-0"
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
