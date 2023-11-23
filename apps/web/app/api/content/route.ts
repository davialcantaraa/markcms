import { auth } from "@clerk/nextjs"
import { ContentField } from "database"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

const createContentSchema = z.object({
  model_id: z.string().uuid(),
})

const contentInitialValues = {
  [ContentField.CHECKBOX.toLowerCase()]: false,
  [ContentField.DATE.toLowerCase()]: new Date(),
  [ContentField.EMAIL.toLowerCase()]: "your@email.com",
  [ContentField.MARKDOWN.toLowerCase()]: "# Start typing...",
  [ContentField.NUMBER.toLowerCase()]: 0,
  [ContentField.PHONE.toLowerCase()]: 5555551234,
  [ContentField.TEXT.toLowerCase()]: "New text",
  [ContentField.SELECTION.toLowerCase()]: [],
  [ContentField.URL.toLowerCase()]: "https://markcms.davialcantara.dev",
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = createContentSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        {
          message: `Field ${validation.error.issues[0].path}: ${validation.error.issues[0].message}`,
        },
        { status: 400 }
      )
    }

    const { userId } = auth()
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const {
      data: { model_id },
    } = validation

    const content = await db.$transaction(async (ctx) => {
      const fields = await ctx.field.findMany({
        where: {
          creator_id: userId,
          model_id,
        },
      })

      console.log(fields)

      fields.map((item) => {
        console.log(contentInitialValues[item.name.toLowerCase()])
      })

      return await ctx.content.create({
        data: {
          creator_id: userId,
          model_id,
          raw_data: fields.reduce((acc, item) => {
            // @ts-ignore
            acc[item.name.toLowerCase()] =
              contentInitialValues[item.type.toLowerCase()]
            return acc
          }, {}),
        },
      })
    })

    return NextResponse.json(
      { message: "Content created successfully.", id: content.id },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    )
  }
}
