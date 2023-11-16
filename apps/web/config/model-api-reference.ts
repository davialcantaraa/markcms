import { env } from "@/env.mjs"

export const MODEL_API_REFERENCE = {
  sections: [
    {
      title: "Retrieve model",
      description: "Retrieve a single model for the authenticated user.",
      codeOptions: [
        {
          value: "axios",
          title: "Axios",
          generateCode: (model_id: string) => {
            const content = `
            import axios from 'axios';

            const models = await axios.get("${env.NEXT_PUBLIC_API_URL}/v1/models/${model_id}", {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer cms_123456789"
              },
            })
            `
            return "```ts" + content + "```"
          },
        },
        {
          value: "curl",
          title: "cURL",
          generateCode: (model_id: string) => {
            const content = `
            curl -X POST '${env.NEXT_PUBLIC_API_URL}/v1/models/${model_id}'
              -H 'Authorization: Bearer cms_123456789'
              -H 'Content-Type: application/json'
            `
            return "```ts" + content + "```"
          },
        },
      ],
    },
    {
      title: "Retrieve model contents",
      description: "Retrieve a list of contents for the authenticated user.",
      codeOptions: [
        {
          value: "axios",
          title: "Axios",
          generateCode: (model_id: string) => {
            const content = `
import axios from 'axios';

const models = await axios.get("${env.NEXT_PUBLIC_API_URL}/v1/models/${model_id}/contents", {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer cms_123456789"
  },
})
            `
            return content
          },
        },
        {
          value: "curl",
          title: "cURL",
          generateCode: (model_id: string) => {
            const content = `
curl -X POST '${env.NEXT_PUBLIC_API_URL}/v1/models/${model_id}/contents'
  -H 'Authorization: Bearer cms_123456789'
  -H 'Content-Type: application/json'
            `
            return content
          },
        },
      ],
    },
  ],
}
