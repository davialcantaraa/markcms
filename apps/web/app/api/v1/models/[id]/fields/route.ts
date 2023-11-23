import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/prisma"
import { extractToken } from "@/lib/utils"

interface Params {
  params: {
    id: string
  }
}

export async function GET(_: Request, { params }: Params) {
  try {
    const headerList = headers()

    const token = extractToken(String(headerList.get("Authorization")))

    if (!token) return NextResponse.json("API key missing", { status: 401 })

    const isIdValid = z.string().uuid().safeParse(params.id)
    if (!isIdValid.success)
      return NextResponse.json("Invalid model id", { status: 400 })

    const fields = await db.$transaction(async (ctx) => {
      const validKey = await ctx.apiKey.findFirst({
        where: {
          token,
        },
      })

      if (!validKey) {
        return "Invalid key"
      }

      const keyHasPermission = validKey?.model === params.id || validKey?.model === "all"

      if (!keyHasPermission) {
        return "Key has no permission"
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

      const fields = await db.field.findMany({
        where: {
          creator_id: validKey.creator_id,
          model_id: params.id,
        },
      })

      return fields
    })

    if (typeof fields === "string")
      return NextResponse.json(fields.toString(), { status: 401 })

    if (!fields) return NextResponse.json("Fields not found", { status: 401 })

    return NextResponse.json(fields, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
