import { NextResponse } from "next/server"
import { z } from "zod"

import { getGradientAvatar } from "@/lib/api/get-gradient-avatar"
import { db } from "@/lib/prisma"

const routeSchema = z.object({
  userId: z.string(),
  projectName: z.string().min(2).max(50),
  projectDescription: z.string().min(2).max(50),
})

export async function POST(request: Request) {
  const res = await request.json()
  const validation = routeSchema.safeParse(res)

  if (!validation.success) {
    return NextResponse.json(
      {
        message: `Field ${validation.error.issues[0].path}: ${validation.error.issues[0].message}`,
      },
      { status: 400 }
    )
  }

  const {
    data: { projectDescription, projectName, userId },
  } = validation

  const createdProject = await db.project.create({
    data: {
      description: projectDescription,
      name: projectName,
      userId,
      image: getGradientAvatar(projectName),
    },
  })

  return NextResponse.json(
    { message: "Project created successfully." },
    {
      status: 201,
      headers: { "Set-Cookie": `@markcms:projectId=${createdProject.id}` },
    }
  )
}
