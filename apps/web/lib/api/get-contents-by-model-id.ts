import { AxiosResponse } from "axios"
import { Content } from "database"

import { http } from "./http"

export async function getContentsByModelId(
  id: string
): Promise<AxiosResponse<Content[]>> {
  return await http.get(`/model/${id}/content`)
}
