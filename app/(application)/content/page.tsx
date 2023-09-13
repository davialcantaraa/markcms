import { CreateModel } from "@/components/model/create-model"
import { Models } from "@/components/model/models"

export default async function Page() {
  return (
    <main className="h-[calc(100vh-65px)] overflow-auto pb-10">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
        <div>
          <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
            Content
          </h1>
          <p className="text-muted-foreground">Create and manage contents.</p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Models
          </h3>
          <CreateModel />
        </div>
        <Models />
      </div>
    </main>
  )
}
