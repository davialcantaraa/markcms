"use client"

import { useQuery } from "@tanstack/react-query"

import { getModels } from "@/lib/api/get-models"

import { ModelEmptyState } from "../empty-states/model-empty-state"
import { ModelItem } from "./model-item"

export const Models = () => {
  const models = useQuery({
    queryKey: ["get-models"],
    queryFn: getModels,
  })

  return (
    <div>
      {models.data?.data.length ? (
        <div className="divide-y divide-border rounded-md border">
          {models.data?.data.map((model) => (
            <ModelItem key={model.id} model={model} />
          ))}
        </div>
      ) : models.isFetching ? (
        <div className="divide-border-200 divide-y rounded-md border">
          <ModelItem.Skeleton />
          <ModelItem.Skeleton />
          <ModelItem.Skeleton />
        </div>
      ) : (
        <ModelEmptyState />
      )}
    </div>
  )
}
