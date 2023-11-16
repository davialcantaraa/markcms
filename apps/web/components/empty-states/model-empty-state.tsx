import { CreateModel } from "../model/create-model"
import { EmptyState } from "./empty-state"

export const ModelEmptyState = () => {
  return (
    <EmptyState>
      <EmptyState.Icon name="model" />
      <EmptyState.Title>No models created</EmptyState.Title>
      <EmptyState.Description>
        You don&apos;t have any models yet. Start creating a model.
      </EmptyState.Description>
      <CreateModel />
    </EmptyState>
  )
}
