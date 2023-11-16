import Link from "next/link"
import { Balancer } from "react-wrap-balancer"

import { HomepageHeader } from "@/components/homepage/homepage-header"
import { buttonVariants } from "@/components/ui/button"
import { applicationConfig } from "@/config/application"

export default function IndexPage() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <HomepageHeader />
      <div className="flex-1">
        <section className="container flex flex-col items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
              <Balancer>Open source markdown CMS</Balancer>
            </h1>
          </div>
          <div className="mx-auto flex gap-4">
            <Link
              href={applicationConfig.links.docs}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ size: "lg" })}
            >
              Documentation
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href={applicationConfig.links.github}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              GitHub
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
