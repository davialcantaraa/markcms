/*
  Warnings:

  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ApiKey";

-- DropTable
DROP TABLE "Log";

-- CreateTable
CREATE TABLE "api-key" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used" TIMESTAMP(3),
    "creator_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "permission" "ApiPermisson" NOT NULL,
    "model" TEXT NOT NULL,
    "uses" INTEGER NOT NULL DEFAULT 0,
    "token" TEXT NOT NULL,

    CONSTRAINT "api-key_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator_id" TEXT NOT NULL,
    "method" "Method" NOT NULL,
    "endpoint" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "request" JSONB NOT NULL,
    "response" JSONB NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "api-key_token_key" ON "api-key"("token");
