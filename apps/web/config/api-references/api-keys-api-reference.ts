import { env } from "@/env.mjs"

export const API_KEYS_API_REFERENCE = {
  sections: [
    {
      title: "Retrieve API Keys",
      description: "Retrieve a list of API Keys for the authenticated user.",
      codeOptions: [
        {
          value: "axios",
          title: "Axios",
          generateCode: () => {
            const content = `
import axios from 'axios';

const apiKeys = await axios.get("${env.NEXT_PUBLIC_API_URL}/v1/api-keys", {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer cms_123456789"
  },
})
            `
            return "```js" + content
          },
        },
        {
          value: "curl",
          title: "cURL",
          generateCode: () => {
            const content = `
curl -X GET '${env.NEXT_PUBLIC_API_URL}/v1/api-keys' \/
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
