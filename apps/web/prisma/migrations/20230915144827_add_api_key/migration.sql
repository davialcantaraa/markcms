-- CreateEnum
CREATE TYPE "ApiPermisson" AS ENUM ('FULL_ACCESS', 'READ_ONLY');

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_used" TIMESTAMP(3) NOT NULL,
    "creator_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "uses" INTEGER NOT NULL,
    "permission" "ApiPermisson" NOT NULL,
    "model" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_token_key" ON "ApiKey"("token");
