import Link from "next/link"

import { SITE_CONFIG } from "@/config/site"

import { Logo } from "../logo"

export default function SiteFooter() {
  return (
    <footer className="relative z-10 w-full py-4 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Developed by{" "}
            <Link
              href={SITE_CONFIG.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Davi Alcântara
            </Link>
          </p>
        </div>
        <p className="space-x-4 text-center text-sm leading-loose text-muted-foreground md:text-left">
          <Link
            href="/about"
            className="font-semibold hover:underline hover:underline-offset-4"
          >
            About
          </Link>
          <Link
            href="/changelog"
            className="font-semibold hover:underline hover:underline-offset-4"
          >
            Changelog
          </Link>
        </p>
      </div>
    </footer>
  )
}
