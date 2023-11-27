import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/home", "/docs", "/upcoming", "/examples", "/api/v1(.*)"],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)", "/"],
}
