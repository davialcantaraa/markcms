import { useApiKeyStore } from "@/stores/api-key-store"
import { ApiKeyStoreInitializer } from "@/stores/api-key-store-initializer"
import { ContentModel } from "database"
import { formatDistance } from "date-fns"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { z } from "zod"

import { ApiKeyApiReference } from "@/components/api-keys/api-key-api-reference"
import { ApiKeyToken } from "@/components/api-keys/api-key-token"
import { Icons } from "@/components/icons"
import { buttonVariants } from "@/components/ui/button"
import { getApiKeyById } from "@/lib/api/get-api-key-by-id"
import { getModelById } from "@/lib/api/get-model-by-id"
import { capitalizeFirstLetter, cn } from "@/lib/utils"

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const apiKey = await getApiKeyById(params.id)

  return {
    title: apiKey.data.name,
    description: `Information for ${apiKey.data.name} API Key.`,
  }
}

export default async function Page({ params }: Props) {
  const isIdValid = z.string().uuid().safeParse(params.id)

  if (!isIdValid.success) return notFound()

  const apiKey = await getApiKeyById(params.id)

  const isApiKeyValid = z.custom<ContentModel>().safeParse(apiKey.data)

  if (!isApiKeyValid.success) return notFound()

  const model = await getModelById(apiKey.data.model)

  useApiKeyStore.setState({ apiKey: apiKey.data })

  return (
    <>
      <ApiKeyStoreInitializer apiKey={apiKey.data} />
      <main className="h-[calc(100vh-65px)] w-[calc(100vw-15rem)] overflow-auto pb-10">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
          <div className="flex items-center gap-2">
            <Link
              href="/api-keys"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              <Icons.arrowLeft />
            </Link>
            <div>
              <h3 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
                {apiKey.data.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ApiKeyApiReference />
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex flex-wrap">
            <div className="mt-8 flex h-12 w-full flex-col justify-between gap-2 md:basis-1/4">
              <label className="text-sm text-muted-foreground">Token</label>
              <div className="flex items-center gap-2">
                <ApiKeyToken>{apiKey.data.token}</ApiKeyToken>
              </div>
            </div>
            <div className="mt-8 flex h-12 w-full flex-col justify-between gap-2 md:basis-1/4">
              <label className="text-sm text-muted-foreground">
                Permission
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium leading-none">
                  {capitalizeFirstLetter(
                    apiKey.data.permission.toLocaleLowerCase()
                  )
                    .split("_")
                    .join(" ")}
                </span>
              </div>
            </div>
            <div className="mt-8 flex w-full flex-col justify-between gap-2 md:basis-1/4">
              <label className="text-sm text-muted-foreground">Model</label>
              <div className="flex items-center gap-2">
                <Link
                  href={`/models/${model.data.id}`}
                  className="text-sm font-medium leading-none underline"
                >
                  {model.data.name}
                </Link>
              </div>
            </div>
            <div className="mt-8 flex h-12 w-full flex-col justify-between gap-2 md:basis-1/4">
              <label className="text-sm text-muted-foreground">
                Total uses
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium leading-none">
                  {apiKey.data.uses} {apiKey.data.uses === 1 ? "time" : "times"}
                </span>
              </div>
            </div>
            <div className="mt-8 flex h-12 w-full flex-col justify-between gap-2 md:basis-1/4">
              <label className="text-sm text-muted-foreground">Last used</label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium leading-none">
                  {!!apiKey.data.last_used
                    ? formatDistance(
                        new Date(apiKey.data.last_used),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )
                    : "Never used"}
                </span>
              </div>
            </div>
            <div className="mt-8 flex h-12 w-full flex-col justify-between gap-2 md:basis-1/4">
              <label className="text-sm text-muted-foreground">
                Created at
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium leading-none">
                  {formatDistance(
                    new Date(apiKey.data.created_at),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
