import { MessageSquare } from "lucide-react"

import { Button } from "../ui/button"

export const ApplicationHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-6">
      <div className="flex h-16 justify-end">
        <nav className="flex items-center gap-2">
          <Button className="flex items-center gap-1">
            <MessageSquare width={16} />
            Feedback
          </Button>
        </nav>
      </div>
    </header>
  )
}
