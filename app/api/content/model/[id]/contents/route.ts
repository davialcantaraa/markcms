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
      return NextResponse.json("Invalid model id", { status: 400 })

    const { userId } = auth()
    if (!userId) {
      return NextResponse.json("Unauthorized", { status: 401 })
    }

    const contents = await db.content.findMany({
      where: {
        creator_id: userId,
        model_id: params.id,
      },
    })

    return NextResponse.json(contents, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
