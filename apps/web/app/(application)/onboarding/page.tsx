import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="h-[calc(100vh-65px)] overflow-auto pb-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8">
        <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
          Create your first content
        </h1>
        <p className="text-slate-11 text-sm font-normal">
          Follow the steps to create and use your first content
        </p>
      </div>
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6">
        <div className="pointer-events-none p-6 opacity-50">
          <h3 className="text-slate-12 mb-1 text-xl font-bold tracking-[-0.16px]">
            Add an API Key
          </h3>
          <p className="text-slate-11 mb-6 text-sm font-normal">
            Use the following generated key to authenticate requests
          </p>
          <Button className="flex items-center gap-2">
            <Icons.lock width={16} /> Add API Key
          </Button>
        </div>
        <div className="p-6 opacity-50">
          <h3 className="text-slate-12 mb-1 text-xl font-bold tracking-[-0.16px]">
            Create a content
          </h3>
          <p className="text-slate-11 mb-6 text-sm font-normal">
            Use the following generated key to authenticate requests
          </p>
          <Button className="flex items-center gap-2">
            <Icons.lock width={16} /> Create content
          </Button>
        </div>
      </div>
    </main>
  )
}
