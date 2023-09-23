import { auth } from "@clerk/nextjs"
import { ContentField } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

const schema = z.object({
  name: z.string().min(2).max(50),
  model_id: z.string().uuid(),
  type: z.nativeEnum(ContentField),
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
      data: { model_id, type, name },
    } = validation

    await db.field.create({
      data: {
        creator_id: userId,
        model_id,
        type,
        name,
      },
    })

    return NextResponse.json(
      { message: "Field created successfully." },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    )
  }
}
