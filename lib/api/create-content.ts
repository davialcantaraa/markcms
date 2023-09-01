import { z } from "zod"

import { SuccessResponse } from "@/types/api"

import { http } from "./http"

const schema = z.object({
  user_id: z.string().min(2),
  model_id: z.string().uuid(),
  raw_data: z.record(z.any()),
})

export async function createContent(
  data: z.infer<typeof schema>
): Promise<SuccessResponse> {
  return await http.post("/content/create", data)
}
