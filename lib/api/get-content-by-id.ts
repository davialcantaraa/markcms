import { Content, Field } from "@prisma/client"
import { AxiosResponse } from "axios"

import { http } from "./http"

interface ExtendedContent extends Content {
  model: {
    fields: Field[]
    name: string
  } | null
}

export async function getContentById(
  id: string
): Promise<AxiosResponse<ExtendedContent>> {
  return await http.get(`/content/${id}`)
}
