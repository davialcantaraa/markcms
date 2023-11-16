import { CreateApiKey } from "../api-keys/create-api-key"
import { EmptyState } from "./empty-state"

export const ApiKeysEmptyState = () => {
  return (
    <EmptyState>
      <EmptyState.Icon name="lock" />
      <EmptyState.Title>No API keys created</EmptyState.Title>
      <EmptyState.Description>
        You don&apos;t have any API keys. Start creating one.
      </EmptyState.Description>
      <CreateApiKey />
    </EmptyState>
  )
}
