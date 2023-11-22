"use server"

import { env } from "@/env.mjs"
import { ErrorResponse, Resend } from "resend"
import { CreateEmailResponseSuccess } from "resend/build/src/emails/interfaces"

interface Props {
  subject: string
  html: string
  to: string[]
}

export async function sendEmail({ html, subject, to }: Props): Promise<{
  data: CreateEmailResponseSuccess | null
  error: ErrorResponse | null
}> {
  const resend = new Resend(env.RESEND_API_KEY)
  console.log(env.RESEND_API_KEY)

  const { data, error } = await resend.emails.send({
    from: "Acme <markcms@davialcantara.dev>",
    to,
    subject,
    html,
  })

  if (error) {
    return {
      data: null,
      error,
    }
  }

  return {
    data,
    error: null,
  }
}
