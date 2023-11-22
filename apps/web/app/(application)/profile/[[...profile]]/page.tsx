import { UserProfile } from "@clerk/nextjs"

export default function Page() {
  return (
    <main className="h-[calc(100vh-65px)] overflow-auto pb-10">
      <div className="mx-auto flex w-full items-center justify-between px-6 py-8 md:max-w-5xl">
        <div>
          <h1 className="text-slate-12 text-[28px] font-bold leading-[34px] tracking-[-0.416px]">
            Profile
          </h1>
          <p className="text-muted-foreground">
            Manage your profile information.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6">
        <UserProfile
          path="/profile"
          routing="path"
          appearance={{
            variables: {
              colorPrimary: "#171717",
            },
            elements: {
              card: "shadow-none",
              headerTitle: "hidden",
              navbar: "hidden",
            },
          }}
        />
      </div>
    </main>
  )
}
