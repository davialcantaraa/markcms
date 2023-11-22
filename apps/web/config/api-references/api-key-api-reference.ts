import { env } from "@/env.mjs"

export const API_KEY_API_REFERENCE = {
  sections: [
    {
      title: "Retrieve API Key",
      description: "Retrieve a single API Key for the authenticated user.",
      codeOptions: [
        {
          value: "axios",
          title: "Axios",
          generateCode: (api_key_id: string) => {
            const content = `
import axios from 'axios';

const apiKey = await axios.get("${env.NEXT_PUBLIC_API_URL}/v1/api-keys/${api_key_id}", {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer cms_123456789"
  },
})`
            return "```js" + content
          },
        },
        {
          value: "curl",
          title: "cURL",
          generateCode: (api_key_id: string) => {
            const content = `
curl -X GET '${env.NEXT_PUBLIC_API_URL}/v1/api-keys/${api_key_id}' \/
  -H 'Authorization: Bearer cms_123456789' \/
  -H 'Content-Type: application/json' \/
`
            return "```bash" + content
          },
        },
      ],
    },
  ],
}
