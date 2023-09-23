import { z } from "zod"

import { SuccessResponse } from "@/types/api"

import { http } from "./http"

const schema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(50),
})

export async function createModel(
  data: z.infer<typeof schema>
): Promise<SuccessResponse> {
  return await http.post("/content/model/create", data)
}
