import { ContentStoreInitializer } from "@/stores/content-store-initializer"
import { Content } from "@prisma/client"
import { notFound } from "next/navigation"
import { z } from "zod"

import { ContentForm } from "@/components/content/content-form"
import { getContentById } from "@/lib/api/get-content-by-id"

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
        <ContentForm />
      </main>
    </>
  )
}
