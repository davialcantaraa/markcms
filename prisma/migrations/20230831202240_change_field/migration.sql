/*
  Warnings:

  - You are about to drop the column `content_id` on the `field` table. All the data in the column will be lost.
  - Made the column `model_id` on table `field` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ContentField" ADD VALUE 'CHECKBOX';
ALTER TYPE "ContentField" ADD VALUE 'EMAIL';
ALTER TYPE "ContentField" ADD VALUE 'URL';
ALTER TYPE "ContentField" ADD VALUE 'PHONE';

-- DropForeignKey
ALTER TABLE "field" DROP CONSTRAINT "field_model_id_fkey";

-- AlterTable
ALTER TABLE "field" DROP COLUMN "content_id",
ALTER COLUMN "model_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "field" ADD CONSTRAINT "field_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "content-model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
