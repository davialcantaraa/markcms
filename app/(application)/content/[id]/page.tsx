import { ContentStoreInitializer } from "@/stores/content-store-initializer"
import { Content } from "@prisma/client"
import Link from "next/link"
import { notFound } from "next/navigation"
import { z } from "zod"

import { ContentForm } from "@/components/content/content-form"
import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { getContentById } from "@/lib/api/get-content-by-id"
import { cn } from "@/lib/utils"

interface Props {
  params: { id: string }
}

export default async function Page({ params }: Props) {
  const isIdValid = z.string().uuid().safeParse(params.id)

  if (!isIdValid.success) return notFound()

  const content = await getContentById(params.id)

  const isContentValid = z.custom<Content>().safeParse(content.data)

  if (!isContentValid.success) return notFound()

  return (
    <>
      <ContentStoreInitializer content={content.data} />
      <main className="h-[calc(100vh-65px)] overflow-auto pb-10">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
          <div className="flex gap-1">
            <Link
              href={`/content/model/${content.data.model_id}`}
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              <Icons.arrowLeft />
            </Link>
            <div>
              <h3 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px] flex items-center gap-2">
                Editing
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-base font-semibold">
                  {content.data.id}
                </code>
                from{" "}
                <Link
                  href={`/content/model/${content.data.model_id}`}
                  target="_blank"
                  className="underline"
                >
                  {content.data.model?.name}
                </Link>
              </h3>
            </div>
          </div>
          <Button variant="secondary">
            <Icons.api className="mr-2 h-4 w-4" />
            API
          </Button>
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <ContentForm />
        </div>
      </main>
    </>
  )
}
