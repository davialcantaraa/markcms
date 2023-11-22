import { headers } from "next/headers"
import { NextResponse } from "next/server"

import { db } from "@/lib/prisma"
import { extractToken } from "@/lib/utils"

export async function GET() {
  try {
    const headerList = headers()

    const token = extractToken(String(headerList.get("Authorization")))

    if (!token) return NextResponse.json("API key missing", { status: 401 })

    const models = await db.$transaction(async (ctx) => {
      const validKey = await ctx.apiKey.findFirst({
        where: {
          token,
        },
      })

      if (!validKey) {
        return null
      }

      const keyHasPermission = validKey?.model === "all"

      if (!keyHasPermission) {
        return null
      }

      await db.apiKey.update({
        where: {
          id: validKey.id,
        },
        data: {
          last_used: new Date(),
          uses: validKey.uses + 1,
        },
      })

      const models = await db.contentModel.findMany({
        where: {
          creator_id: validKey.creator_id,
        },
      })

      return models
    })

    if (!models) return NextResponse.json("Invalid API key", { status: 401 })

    return NextResponse.json(models, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
