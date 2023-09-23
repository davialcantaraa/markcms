import { auth } from "@clerk/nextjs"
import { ContentField } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

const schema = z.object({
  name: z.string().min(2).max(50),
  field_id: z.string().uuid(),
  type: z.nativeEnum(ContentField),
})

interface Params {
  params: {
    id: string
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const isIdValid = z.string().uuid().safeParse(params.id)
    if (!isIdValid.success)
      return NextResponse.json("Invalid id", { status: 400 })

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
      data: { type, name },
    } = validation

    await db.field.update({
      where: {
        id: params.id,
      },
      data: {
        type,
        name,
      },
    })

    return NextResponse.json(
      { message: "Field updated successfully." },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    )
  }
}
