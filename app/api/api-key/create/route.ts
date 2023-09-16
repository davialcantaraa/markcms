import { auth } from "@clerk/nextjs"
import { ApiPermisson } from "@prisma/client"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"
import { generateApiKey } from "@/lib/utils"

const schema = z.object({
  name: z.string().min(2).max(50),
  permission: z.nativeEnum(ApiPermisson),
  model: z.string().uuid().or(z.literal("all")),
  user_id: z.string().min(2),
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
      data: { model, name, permission, user_id },
    } = validation

    const key = await db.apiKey.create({
      data: {
        creator_id: user_id,
        model,
        name,
        permission,
        token: generateApiKey(),
      },
    })

    return NextResponse.json(
      { message: "API key created successfully.", token: key.token },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    )
  }
}
