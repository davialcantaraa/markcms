"use client"

import { queryClient } from "@/providers/app-provider"
import { Content } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useToggle } from "react-use"
import { toast } from "sonner"

import { deleteContent } from "@/lib/api/delete-content-by-id"
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
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface Props {
  content: Content
}

export const ContentItemOperations = ({ content }: Props) => {
  const [showDeleteDialog, toggleDeleteDialog] = useToggle(false)

  const deleteContentMutation = useMutation({
    mutationKey: ["delete-content"],
    mutationFn: deleteContent,
    onSuccess: async (response) => {
      toast(response.data.message)
      queryClient.invalidateQueries(["get-contents"])
      toggleDeleteDialog()
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

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
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={`/contents/${content.id}`}>
              <Icons.pen className="mr-2 h-4 w-4" />
              Edit content
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500 hover:text-red-500"
            onSelect={toggleDeleteDialog}
          >
            <Icons.trash className="mr-2 h-4 w-4" />
            Delete content
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteDialog} onOpenChange={toggleDeleteDialog}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this content?
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
                deleteContentMutation.mutate(content.id)
              }}
              className="bg-red-500 focus:ring-red-500"
            >
              {deleteContentMutation.isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
