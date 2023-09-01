import { env } from "@/env.mjs"
import { auth } from "@clerk/nextjs"
import axios, { InternalAxiosRequestConfig } from "axios"

import { useEnvironment } from "@/hooks/use-environment"

export const http = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const tokenInterceptor = async (config: InternalAxiosRequestConfig) => {
  const environment = useEnvironment()
  if (environment === "server") {
    const { getToken } = auth()

    config.headers.Authorization = `Bearer ${await getToken()}`

    return config
  }
  return config
}

http.interceptors.request.use(tokenInterceptor)
