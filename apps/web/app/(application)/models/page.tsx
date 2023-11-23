import { Metadata } from "next"

import { CreateModel } from "@/components/model/create-model"
import { Models } from "@/components/model/models"
import { ModelsApiReference } from "@/components/model/models-api-reference"

export const metadata: Metadata = {
  title: "Models",
  description: "Create and manage content models.",
}

export default async function Page() {
  return (
    <main className="h-[calc(100vh-65px)] w-[calc(100vw-15rem)] overflow-auto pb-10">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
        <div>
          <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
            Models
          </h1>
          <p className="text-muted-foreground">
            Create and manage content models.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CreateModel />
          <ModelsApiReference />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <Models />
      </div>
    </main>
  )
}
