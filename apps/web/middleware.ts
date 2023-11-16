import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/home", "/api/v1(.*)"],
  beforeAuth: (req, evt) => {
    console.log("REQUEST", req)
    console.log("REQUEST", evt)
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)", "/"],
}
