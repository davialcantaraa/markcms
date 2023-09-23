import { ApiKey } from "@prisma/client"
import { AxiosResponse } from "axios"

import { http } from "./http"

export async function getApiKeys(): Promise<AxiosResponse<ApiKey[]>> {
  return await http.get("/api-key")
}
