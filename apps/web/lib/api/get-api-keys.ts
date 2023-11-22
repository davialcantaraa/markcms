import { AxiosResponse } from "axios"
import { ApiKey } from "database"

import { http } from "./http"

export async function getApiKeys(): Promise<AxiosResponse<ApiKey[]>> {
  return await http.get("/api-key")
}
