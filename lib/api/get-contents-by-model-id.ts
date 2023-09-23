import { Content } from "@prisma/client"
import { AxiosResponse } from "axios"

import { http } from "./http"

export async function getContentsByModelId(
  id: string
): Promise<AxiosResponse<Content[]>> {
  return await http.get(`/content/model/${id}/contents`)
}
