import { CreateField } from "../field/create-field"
import { EmptyState } from "./empty-state"

export const FieldEmptyState = () => {
  return (
    <EmptyState>
      <EmptyState.Icon name="field" />
      <EmptyState.Title>No fields created</EmptyState.Title>
      <EmptyState.Description>
        You don&apos;t have any fields in your model. Start creating a field.
      </EmptyState.Description>
      <CreateField />
    </EmptyState>
  )
}
