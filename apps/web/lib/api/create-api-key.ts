import { ApiPermisson } from "@prisma/client"
import { z } from "zod"

import { SuccessTokenResponse } from "@/types/api"

import { http } from "./http"

const schema = z.object({
  name: z.string().min(2).max(50),
  permission: z.nativeEnum(ApiPermisson),
  model: z.string().uuid().or(z.literal("all")),
})

export async function createApiKey(
  data: z.infer<typeof schema>
): Promise<SuccessTokenResponse> {
  return await http.post("/api-key", data)
}
