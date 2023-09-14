"use client"

import { queryClient } from "@/providers/app-provider"
import { useModelStore } from "@/stores/model-store"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContentField } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { useToggle } from "react-use"
import { toast } from "sonner"
import { z } from "zod"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createField } from "@/lib/api/create-field"
import { capitalizeFirstLetter } from "@/lib/utils"
import { ErrorResponse } from "@/types/api"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

const schema = z.object({
  name: z.string().min(2).max(50),
  type: z.nativeEnum(ContentField),
})

const FIELDS = Object.values(ContentField)

export const CreateField = () => {
  const { model } = useModelStore()
  const [open, toggle] = useToggle(false)

  const user = useAuth()

  const createFieldMutation = useMutation({
    mutationKey: ["create-content-field"],
    mutationFn: createField,
    onSuccess: async (response) => {
      toast.success(response.data.message)
      queryClient.invalidateQueries(["get-fields"])
      toggle()
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log("aa")
    if (!user.isSignedIn) return
    createFieldMutation.mutate({
      ...values,
      user_id: user.userId,
      model_id: model.id,
    })
  }

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button>
          <Icons.plus className="mr-2 h-4 w-4" />
          Add field
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new field</DialogTitle>
          <DialogDescription>
            Add a new field to your model <b>{model.name}</b>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FIELDS.map((item) => (
                        <SelectItem key={item} value={item}>
                          {capitalizeFirstLetter(item.toLocaleLowerCase())}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createFieldMutation.isLoading}>
                {createFieldMutation.isLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create field
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
