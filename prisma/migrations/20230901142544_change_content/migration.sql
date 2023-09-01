/*
  Warnings:

  - You are about to drop the column `content_model_id` on the `content` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_content_model_id_fkey";

-- AlterTable
ALTER TABLE "content" DROP COLUMN "content_model_id",
ADD COLUMN     "model_id" TEXT;

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "content-model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
