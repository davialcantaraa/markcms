"use client"

import { queryClient } from "@/providers/app-provider"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ContentField, Field } from "database"
import { AlertCircle } from "lucide-react"
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
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { deleteField } from "@/lib/api/delete-field-by-id"
import { updateFieldById } from "@/lib/api/update-field-by-id"
import { capitalizeFirstLetter } from "@/lib/utils"
import { ErrorResponse } from "@/types/api"

import { Icons } from "../icons"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog"
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

interface Props {
  field: Field
}

const FIELDS = Object.values(ContentField)

export const EditField = ({ field }: Props) => {
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false)
  const [open, toggle] = useToggle(false)

  const user = useAuth()

  const editFieldMutation = useMutation({
    mutationKey: ["update-field"],
    mutationFn: updateFieldById,
    onSuccess: async (response) => {
      toast.success(response.data.message)
      queryClient.invalidateQueries(["get-fields"])
      toggle()
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

  const deleteFieldMutation = useMutation({
    mutationKey: ["delete-field"],
    mutationFn: deleteField,
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
    defaultValues: {
      name: field.name,
      type: field.type,
    },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    if (!user.isSignedIn) return
    editFieldMutation.mutate({
      ...values,
      field_id: field.id,
    })
  }

  return (
    <Dialog open={open} onOpenChange={toggle}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="group">
          {field.name}
          <Icons.pen size={12} className="invisible ml-1 group-hover:visible" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit field</DialogTitle>
          <DialogDescription>
            Change name and type of <b>{field.name}</b>
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
                  <FormDescription className="flex items-center gap-2">
                    <AlertCircle size={24} />
                    Editing the field type also deletes its content. This action
                    cannot be undone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <AlertDialog
                open={showDeleteDialog}
                onOpenChange={toggleDeleteDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="secondary"
                    type="button"
                    className="text-red-500"
                    disabled={deleteFieldMutation.isLoading}
                  >
                    {deleteFieldMutation.isLoading ? (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Icons.trash className="mr-2 h-4 w-4" />
                    )}
                    Delete field
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this field?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-destructive">
                      Deleting this field also deletes its content. This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault()
                        deleteFieldMutation.mutate(field.id)
                      }}
                      className="bg-red-500 focus:ring-red-500"
                    >
                      {deleteFieldMutation.isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.trash className="mr-2 h-4 w-4" />
                      )}
                      <span>Delete</span>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit" disabled={editFieldMutation.isLoading}>
                {editFieldMutation.isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Edit field
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
