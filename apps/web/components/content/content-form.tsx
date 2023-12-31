"use client"

import { queryClient } from "@/providers/app-provider"
import { useContentStore } from "@/stores/content-store"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useBeforeUnload } from "react-use"
import { toast } from "sonner"

import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { updateContentById } from "@/lib/api/update-content-by-id"
import { cn } from "@/lib/utils"
import { ErrorResponse } from "@/types/api"

import { Form, FormField as PrimitiveFormField } from "../ui/form"
import { ContentApiReference } from "./content-api-reference"
import { FormField } from "./content-form-field"

export const ContentForm = () => {
  const [beforeUnloadEnable, setBeforeUnloadEnable] = useState(false)
  const { content } = useContentStore()
  const router = useRouter()

  const form = useForm({
    defaultValues: content.raw_data! as any,
  })

  useBeforeUnload(beforeUnloadEnable, "You sure?")

  const updateContentMutation = useMutation({
    mutationKey: ["update-content"],
    mutationFn: updateContentById,
    onSuccess: (response) => {
      setBeforeUnloadEnable(false)
      toast.success(response.data.message)
      queryClient.invalidateQueries(["get-contents", "get-fields"])
      router.push(`/models/${content.model_id}`)
      router.refresh()
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

  function onSubmit(data: any) {
    updateContentMutation.mutate({ content_id: content.id, raw_data: data })
  }

  return (
    <>
      <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
        <div className="flex items-center gap-2">
          <Link
            href={`/models/${content.model_id}`}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            <Icons.arrowLeft />
          </Link>
          <div>
            <h3 className="text-slate-12 flex items-center gap-2 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
              Editing
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-base font-semibold">
                {content.id}
              </code>
              from{" "}
              <Link
                href={`/models/${content.model_id}`}
                target="_blank"
                className="underline"
              >
                {content.model?.name}
              </Link>
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={updateContentMutation.isLoading}
          >
            {updateContentMutation.isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save content
          </Button>
          <ContentApiReference />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <Form {...form}>
          <form className="space-y-6">
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
          </form>
        </Form>
      </div>
    </>
  )
}
