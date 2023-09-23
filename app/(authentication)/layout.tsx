import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full flex-1 items-center justify-center">
      {children}
    </div>
  )
}
