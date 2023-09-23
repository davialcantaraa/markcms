import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

const schema = z.object({
  model_id: z.string().uuid(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = schema.safeParse(body)

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

      return await ctx.content.create({
        data: {
          creator_id: userId,
          model_id,
          raw_data: fields.map((item) => ({
            [item.name.toLocaleLowerCase()]: "",
          })),
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
