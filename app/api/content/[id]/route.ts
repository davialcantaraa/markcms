import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"

interface Params {
  params: {
    id: string
  }
}

export async function GET(_: Request, { params }: Params) {
  try {
    const isIdValid = z.string().uuid().safeParse(params.id)
    if (!isIdValid.success)
      return NextResponse.json("Invalid id", { status: 400 })

    const { userId } = auth()
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const content = await db.content.findFirst({
      where: {
        creator_id: userId,
        id: params.id,
      },
      include: {
        model: {
          select: {
            name: true,
            fields: true,
          },
        },
      },
    })
    if (!content) {
      return NextResponse.json("Content not found", { status: 400 })
    }

    return NextResponse.json(content, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
