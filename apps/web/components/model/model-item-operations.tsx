"use client"

import { queryClient } from "@/providers/app-provider"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { ContentModel } from "database"
import { useForm } from "react-hook-form"
import { useToggle } from "react-use"
import { toast } from "sonner"
import { z } from "zod"

import { Icons } from "@/components/icons"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { deleteModel } from "@/lib/api/delete-model-by-id"
import { updateModelById } from "@/lib/api/update-model-by-id"
import { ErrorResponse } from "@/types/api"

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

interface ModelItemOperationsProps {
  model: ContentModel
}

const editModelSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
})

export function ModelItemOperations({ model }: ModelItemOperationsProps) {
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false)
  const [showEditDialog, toggleEditDialog] = useToggle(false)

  const user = useAuth()

  const editModelForm = useForm<z.infer<typeof editModelSchema>>({
    resolver: zodResolver(editModelSchema),
    defaultValues: {
      name: model.name,
      description: model.description,
    },
  })

  const deleteModelMutation = useMutation({
    mutationKey: ["delete-model"],
    mutationFn: deleteModel,
    onSuccess: async (response) => {
      toast.success(response.data.message)
      queryClient.invalidateQueries(["get-models"])
      toggleDeleteDialog()
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

  const editModelMutation = useMutation({
    mutationKey: ["update-model"],
    mutationFn: updateModelById,
    onSuccess: async (response) => {
      toast.success(response.data.message)
      editModelForm.reset()
      queryClient.invalidateQueries(["get-models"])
      toggleEditDialog()
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

  function onSubmit(values: z.infer<typeof editModelSchema>) {
    if (!user.isSignedIn) return
    editModelMutation.mutate({
      ...values,
      model_id: model.id,
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={toggleEditDialog}
          >
            <Icons.pen className="mr-2 h-4 w-4" />
            Edit model
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500 hover:text-red-500"
            onSelect={toggleDeleteDialog}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete model
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={toggleDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete the <b>{model.name}</b> model?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-destructive">
              Deleting this model also deletes its contents. This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                deleteModelMutation.mutate(model.id)
              }}
              disabled={deleteModelMutation.isLoading}
              className="bg-red-500 focus:ring-red-500"
            >
              {deleteModelMutation.isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog open={showEditDialog} onOpenChange={toggleEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit content model</DialogTitle>
            <DialogDescription>
              Change name and description of <b>{model.name}</b>
            </DialogDescription>
          </DialogHeader>
          <Form {...editModelForm}>
            <form
              onSubmit={editModelForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editModelForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editModelForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model description</FormLabel>
                    <FormControl>
                      <Textarea className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => {
                    editModelForm.reset()
                    toggleEditDialog()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={editModelMutation.isLoading}>
                  {editModelMutation.isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Edit model
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
