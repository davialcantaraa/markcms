import { Metadata } from "next"

import { ApiKeysApiReference } from "@/components/api-keys/api-keys-api-reference"
import { ApiKeysTable } from "@/components/api-keys/api-keys-table"
import { CreateApiKey } from "@/components/api-keys/create-api-key"
import { ViewApiKey } from "@/components/api-keys/view-api-key"

export const metadata: Metadata = {
  title: "API Keys",
  description: "Create and manage content API Keys.",
}

export default function Page() {
  return (
    <main className="h-[calc(100vh-65px)] overflow-auto pb-10">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
        <div>
          <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
            API Keys
          </h1>
          <p className="text-muted-foreground">
            Create and manage content API Keys.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CreateApiKey />
          <ApiKeysApiReference />
          <ViewApiKey />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <ApiKeysTable />
      </div>
    </main>
  )
}
