import { ContentModel } from "@prisma/client"
import Link from "next/link"

import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/lib/utils"

import { ModelItemOperations } from "./model-item-operations"

interface ModelItemProps {
  model: ContentModel
}

export function ModelItem({ model }: ModelItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/models/${model.id}`}
          className="font-semibold hover:underline"
        >
          {model.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(model.created_at.toString())}
          </p>
        </div>
      </div>
      <ModelItemOperations model={model} />
    </div>
  )
}

ModelItem.Skeleton = function ModelItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
