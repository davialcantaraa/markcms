import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { Feedback } from "../feedback"

export const ApplicationHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background px-6">
      <div className="flex h-16 justify-end">
        <nav className="flex items-center gap-3">
          <Feedback />
          <Link
            href="/docs"
            target="_blank"
            className="flex items-center gap-1 text-sm hover:underline"
          >
            Docs
            <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  )
}
