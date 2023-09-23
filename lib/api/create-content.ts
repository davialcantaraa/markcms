import { z } from "zod"

import { SuccessIdResponse } from "@/types/api"

import { http } from "./http"

const schema = z.object({
  model_id: z.string().uuid(),
  raw_data: z.record(z.any()),
})

export async function createContent(
  data: z.infer<typeof schema>
): Promise<SuccessIdResponse> {
  return await http.post("/content/create", data)
}
