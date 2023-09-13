"use client"

import { queryClient } from "@/providers/app-provider"
import { Content, ContentField, Field } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form"
import { useBeforeUnload } from "react-use"
import { toast } from "sonner"

import { updateContentById } from "@/lib/api/update-content-by-id"
import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Switch } from "../ui/switch"

interface ExtendedContent extends Content {
  model: {
    fields: Field[]
    name: string
  } | null
}

interface Props {
  content: ExtendedContent
}

interface FieldProps {
  type: ContentField
  field: ControllerRenderProps<FieldValues, string>
}

function Field({ type, field }: FieldProps) {
  switch (type) {
    case ContentField.TEXT:
      return <Input type="text" {...field} />
    case ContentField.CHECKBOX:
      return (
        <Switch
          checked={field.value}
          onCheckedChange={field.onChange}
          className="block"
        />
      )
    case ContentField.NUMBER:
      return <Input type="number" {...field} />
    case ContentField.EMAIL:
      return <Input type="email" {...field} />
    case ContentField.PHONE:
      return <Input type="tel" {...field} />
    case ContentField.URL:
      return <Input type="url" {...field} />
    // case ContentField.MARKDOWN:
    //   return <Input type="email" {...field} />
    case ContentField.DATE:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <Icons.calendar className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )
  }
}

export const ContentForm = ({ content }: Props) => {
  const router = useRouter()
  const form = useForm({
    // @ts-ignore
     defaultValues: content.model?.fields.reduce((acc, item) => { acc[item.name.toLowerCase()] = content.raw_data?.[item.name.toLowerCase()]; return acc; }, {})
  })

  useBeforeUnload(true, "You sure?")

  const updateContentMutation = useMutation({
    mutationKey: ["update-content"],
    mutationFn: updateContentById,
    onSuccess: (response) => {
      toast.success(response.data.message)
      router.push(`/content/model/${content.model_id}`)
      queryClient.invalidateQueries(["get-contents"])
    },
  })

  function onSubmit(data: any) {
    updateContentMutation.mutate({ content_id: content.id, raw_data: data })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {content.model?.fields.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            // @ts-ignore
            name={item.name.toLocaleLowerCase()}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.name}</FormLabel>
                {/* @ts-ignore */}
                <FormControl>{Field({ type: item.type, field })}</FormControl>
                <FormMessage />
              </FormItem>
            )}
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
