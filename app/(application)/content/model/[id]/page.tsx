import { useModelStore } from "@/stores/model-store"
import { ModelStoreInitializer } from "@/stores/model-store-initializer"
import { ContentModel } from "@prisma/client"
import Link from "next/link"
import { notFound } from "next/navigation"
import { z } from "zod"

import { ContentTable } from "@/components/content/content-table"
import { CreateField } from "@/components/field/create-field"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { getModelById } from "@/lib/api/get-model-by-id"
import { cn } from "@/lib/utils"

interface Props {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  const isIdValid = z.string().uuid().safeParse(params.id)

  if (!isIdValid.success) return notFound()

  const model = await getModelById(params.id)

  const isModelValid = z.custom<ContentModel>().safeParse(model.data)

  if (!isModelValid.success) return notFound()

  useModelStore.setState({ model: model.data })

  return (
    <>
      <ModelStoreInitializer model={model.data} />
      <main className="h-[calc(100vh-65px)] overflow-auto pb-10">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
          <div className="flex">
            <Link
              href="/content"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              <Icons.arrowLeft />
            </Link>
            <div>
              <h3 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
                {model.data.name}
              </h3>
              <p className="text-muted-foreground">{model.data.description}</p>
            </div>
          </div>
          <CreateField />
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <ContentTable />
        </div>
      </main>
    </>
  )
}
