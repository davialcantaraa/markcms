"use client"

import { queryClient } from "@/providers/app-provider"
import { useAuth } from "@clerk/nextjs"
import { ContentModel } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { createContent } from "@/lib/api/create-content"
import { ErrorResponse } from "@/types/api"

import { Icons } from "../icons"
import { Button } from "../ui/button"

interface Props {
  model: ContentModel
}

export const CreateContent = ({ model }: Props) => {
  const user = useAuth()

  const createContentMutation = useMutation({
    mutationKey: ["create-content"],
    mutationFn: createContent,
    onSuccess: async (response) => {
      toast.success(response.data.message)
      queryClient.invalidateQueries(["get-contents"])
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.response?.data.message)
    },
  })

  function handleCreateContent() {
    if (!user.isSignedIn) return
    createContentMutation.mutate({
      user_id: user.userId,
      model_id: model.id,
      raw_data: {},
    })
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      className="w-full"
      disabled={createContentMutation.isLoading}
      onClick={handleCreateContent}
    >
      {createContentMutation.isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.plus className="mr-2 h-4 w-4" />
      )}
      Add content
    </Button>
  )
}
