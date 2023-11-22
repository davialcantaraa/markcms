"use client"

import { queryClient } from "@/providers/app-provider"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { ApiKey } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
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
import { deleteApiKey } from "@/lib/api/delete-api-key-by-id"
import { updateApiKeyById } from "@/lib/api/update-api-key-by-id"
import { ErrorResponse } from "@/types/api"

import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface ApiKeyOperationsProps {
  apiKey: ApiKey
}

const editApiKeySchema = z.object({
  name: z.string().min(2).max(50),
})

export function ApiKeyOperations({ apiKey }: ApiKeyOperationsProps) {
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false)
  const [showEditDialog, toggleEditDialog] = useToggle(false)

  const user = useAuth()

  const editApiKeyForm = useForm<z.infer<typeof editApiKeySchema>>({
    resolver: zodResolver(editApiKeySchema),
    defaultValues: {
      name: apiKey.name,
    },
  })

  const deleteApiKeyMutation = useMutation({
    mutationKey: ["delete-api-key"],
    mutationFn: deleteApiKey,
    onSuccess: async (response) => {
      toast.success(response.data.message)
      queryClient.invalidateQueries(["get-api-keys"])
      toggleDeleteDialog()
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

  const editApiKeyMutation = useMutation({
    mutationKey: ["update-api-key"],
    mutationFn: updateApiKeyById,
    onSuccess: async (response) => {
      toast.success(response.data.message)
      editApiKeyForm.reset()
      queryClient.invalidateQueries(["get-api-keys"])
      editApiKeyForm.reset()
      toggleEditDialog()
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

  function onSubmit(values: z.infer<typeof editApiKeySchema>) {
    if (!user.isSignedIn) return
    editApiKeyMutation.mutate({
      ...values,
      api_key_id: apiKey.id,
    })
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <Icons.dots className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={toggleEditDialog}
          >
            <Icons.pen className="mr-2 h-4 w-4" />
            Edit API Key
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500 hover:text-red-500"
            onSelect={toggleDeleteDialog}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete API Key
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={toggleDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete the <b>{apiKey.name}</b> API Key?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-destructive">
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault()
                deleteApiKeyMutation.mutate(apiKey.id)
              }}
              disabled={deleteApiKeyMutation.isLoading}
              className="bg-red-500 focus:ring-red-500"
            >
              {deleteApiKeyMutation.isLoading ? (
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
            <DialogTitle>Edit API Key</DialogTitle>
            <DialogDescription>
              Change name and description of <b>{apiKey.name}</b> API Key
            </DialogDescription>
          </DialogHeader>
          <Form {...editApiKeyForm}>
            <form
              onSubmit={editApiKeyForm.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editApiKeyForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  variant="secondary"
                  onClick={() => {
                    editApiKeyForm.reset()
                    toggleEditDialog()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={editApiKeyMutation.isLoading}>
                  {editApiKeyMutation.isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Edit API Key
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
