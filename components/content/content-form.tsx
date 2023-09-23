"use client"

import { queryClient } from "@/providers/app-provider"
import { useContentStore } from "@/stores/content-store"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useBeforeUnload } from "react-use"
import { toast } from "sonner"

import { updateContentById } from "@/lib/api/update-content-by-id"

import { useState } from "react"
import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Form, FormField as PrimitiveFormField } from "../ui/form"
import { FormField } from "./content-form-field"

export const ContentForm = () => {
  const [beforeUnloadEnable, setBeforeUnloadEnable] = useState(true);
  const { content } = useContentStore()
  const router = useRouter()
  const form = useForm({
    defaultValues: content.model?.fields.reduce((acc, item) => {
      // @ts-ignore
      acc[item.name.toLowerCase()] = content.raw_data?.[item.name.toLowerCase()] ?? ''
      return acc
    }, {}),
  })

  useBeforeUnload(beforeUnloadEnable, "You sure?")

  const updateContentMutation = useMutation({
    mutationKey: ["update-content"],
    mutationFn: updateContentById,
    onSuccess: (response) => {
      setBeforeUnloadEnable(false)
      toast.success(response.data.message)
      router.push(`/content/model/${content.model_id}`)
      queryClient.invalidateQueries(["get-contents", "get-fields"])
    },
  })

  function onSubmit(data: any) {
    updateContentMutation.mutate({ content_id: content.id, raw_data: data })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {content.model?.fields.map((item) => (
          <PrimitiveFormField
            key={item.id}
            control={form.control}
            // @ts-ignore
            name={item.name.toLocaleLowerCase()}
            // @ts-ignore
            render={({ field }) => FormField({ type: item.type, field })}
          />
        ))}
        <Button type="submit" disabled={updateContentMutation.isLoading}>
          {updateContentMutation.isLoading && (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save content
        </Button>
      </form>
    </Form>
  )
}
