import { env } from "@/env.mjs"

export const MODELS_API_REFERENCE = {
  sections: [
    {
      title: "Retrieve models",
      description: "Retrieve a list of models for the authenticated user.",
      codeOptions: [
        {
          value: "axios",
          title: "Axios",
          generateCode: () => {
            const content = `
import axios from 'axios';

const models = await axios.get("${env.NEXT_PUBLIC_API_URL}/v1/models", {
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
curl -X GET '${env.NEXT_PUBLIC_API_URL}/v1/models' \/
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
