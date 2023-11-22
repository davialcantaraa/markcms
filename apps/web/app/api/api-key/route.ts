import { auth } from "@clerk/nextjs"
import { ApiPermisson } from "database"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"
import { generateApiKey } from "@/lib/utils"

const createApiKeySchema = z.object({
  name: z.string().min(2).max(50),
  permission: z.nativeEnum(ApiPermisson),
  model: z.string().uuid().or(z.literal("all")),
})

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      return new Response("Unauthorized", { status: 401 })
    }

    const apiKeys = await db.apiKey.findMany({
      where: {
        creator_id: userId,
      },
    })

    return NextResponse.json(apiKeys, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error.", error },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = createApiKeySchema.safeParse(body)

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
      data: { model, name, permission },
    } = validation

    const key = await db.apiKey.create({
      data: {
        creator_id: userId,
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
