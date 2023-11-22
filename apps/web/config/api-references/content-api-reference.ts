import { env } from "@/env.mjs"

export const CONTENT_API_REFERENCE = {
  sections: [
    {
      title: "Retrieve content",
      description: "Retrieve a single content for the authenticated user.",
      codeOptions: [
        {
          value: "axios",
          title: "Axios",
          generateCode: (content_id: string) => {
            const content = `
import axios from 'axios';

const content = await axios.get("${env.NEXT_PUBLIC_API_URL}/v1/contents/${content_id}", {
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
          generateCode: (content_id: string) => {
            const content = `
curl -X GET '${env.NEXT_PUBLIC_API_URL}/v1/contents/${content_id}' \/
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
