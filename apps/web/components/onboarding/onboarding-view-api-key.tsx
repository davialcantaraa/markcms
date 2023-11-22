"use client"

import { useApiKeyStore } from "@/stores/api-key-store"
import { useRouter } from "next/navigation"

import { Icons } from "../icons"
import { Alert, AlertDescription } from "../ui/alert"
import { Button } from "../ui/button"
import { CopyInput } from "../ui/copy-input"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Label } from "../ui/label"

export const OnboardingViewApiKey = () => {
  const router = useRouter()
  const { viewApiOpen, toggleOpen, token } = useApiKeyStore()

  return (
    <Dialog open={viewApiOpen} onOpenChange={toggleOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View API key</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Alert variant="warning">
            <AlertDescription className="flex items-center gap-2">
              <Icons.warning className="h-4 w-4" />
              You can only see this key once. Store it safely.
            </AlertDescription>
          </Alert>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="token">API key</Label>
            <CopyInput value={token} disabled type="text" id="token" />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                toggleOpen()
                router.refresh()
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
