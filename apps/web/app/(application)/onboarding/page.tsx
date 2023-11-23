import { Component, Key } from "lucide-react"
import { Metadata } from "next"

import { ApiKeyToken } from "@/components/api-keys/api-key-token"
import { Icons } from "@/components/icons"
import { OnboardingCreateApiKey } from "@/components/onboarding/onboarding-create-api-key"
import { OnboardingCreateModel } from "@/components/onboarding/onboarding-create-model"
import { OnboardingModelTabs } from "@/components/onboarding/onboarding-models-tabs"
import { OnboardingViewApiKey } from "@/components/onboarding/onboarding-view-api-key"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getApiKeys } from "@/lib/api/get-api-keys"
import { getModels } from "@/lib/api/get-models"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Follow the steps to use MarkCMS API.",
}

export default async function Page() {
  const models = await getModels()
  const apiKeys = await getApiKeys()

  const singleApiKey = apiKeys.data[0]
  const singleModel = models.data[0]

  return (
    <main className="h-[calc(100vh-65px)] overflow-auto pb-10">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
        <div>
          <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
            Onboarding
          </h1>
          <p className="text-muted-foreground">
            Follow the steps to use MarkCMS API.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl space-y-10 px-6">
        <div>
          <h3 className="text-slate-12 mb-6 text-xl font-bold tracking-[-0.16px]">
            Create a content model
          </h3>
          {!!singleModel && (
            <Card className="mb-4 flex w-fit items-center gap-4 p-4">
              <Component />
              <div>
                <p className="text-sm font-medium leading-none">
                  {singleModel.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {singleModel.description}
                </p>
              </div>
            </Card>
          )}
          {models.data.length ? (
            <Button disabled>
              <Icons.plus className="mr-2 h-4 w-4" />
              Create model
            </Button>
          ) : (
            <OnboardingCreateModel />
          )}
        </div>
        <div
          className={cn(
            !models.data.length && "pointer-events-none select-none opacity-50"
          )}
        >
          <h3 className="text-slate-12 mb-1 text-xl font-bold tracking-[-0.16px]">
            Create a API Key
          </h3>
          <p className="text-slate-11 mb-6 text-sm font-normal">
            Use the following generated key to authenticate requests
          </p>
          {!!singleApiKey && (
            <Card className="mb-4 flex w-fit items-center gap-4 p-4">
              <Key />
              <div>
                <p className="mb-1 text-sm font-medium leading-none">
                  {singleApiKey.name}
                </p>
                <ApiKeyToken>{singleApiKey.token}</ApiKeyToken>
              </div>
            </Card>
          )}
          {apiKeys.data.length ? (
            <Button disabled>
              <Icons.plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          ) : (
            <>
              <OnboardingCreateApiKey />
              <OnboardingViewApiKey />
            </>
          )}
        </div>
        {!!singleModel && !!singleApiKey && (
          <div
            className={cn(
              !apiKeys.data.length &&
                "pointer-events-none select-none opacity-50"
            )}
          >
            <h3 className="text-slate-12 mb-1 text-xl font-bold tracking-[-0.16px]">
              Retrieve your model
            </h3>
            <p className="text-slate-11 mb-6 text-sm font-normal">
              Implement or run the code below to retrieve your model.
            </p>
            <OnboardingModelTabs />
          </div>
        )}
      </div>
    </main>
  )
}
