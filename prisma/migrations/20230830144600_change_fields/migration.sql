/*
  Warnings:

  - You are about to drop the column `raw_data` on the `field` table. All the data in the column will be lost.
  - Added the required column `raw_data` to the `content` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "field" DROP CONSTRAINT "field_content_id_fkey";

-- AlterTable
ALTER TABLE "content" ADD COLUMN     "raw_data" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "field" DROP COLUMN "raw_data",
ADD COLUMN     "model_id" TEXT;

-- AddForeignKey
ALTER TABLE "field" ADD CONSTRAINT "field_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "content-model"("id") ON DELETE SET NULL ON UPDATE CASCADE;
