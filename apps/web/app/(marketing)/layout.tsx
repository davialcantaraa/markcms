import { PropsWithChildren } from "react"

import SiteFooter from "@/components/marketing/site-footer"
import SiteHeader from "@/components/marketing/site-header"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </>
  )
}
