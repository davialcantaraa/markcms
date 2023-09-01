import { PropsWithChildren } from "react"

import { ApplicationHeader } from "@/components/application-header"
import { ApplicationSidebar } from "@/components/application-sidebar"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <ApplicationSidebar />
      <div className="w-full">
        <ApplicationHeader />
        {children}
      </div>
    </div>
  )
}
