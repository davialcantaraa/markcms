-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_model_id_fkey";

-- DropForeignKey
ALTER TABLE "field" DROP CONSTRAINT "field_model_id_fkey";

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "content-model"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field" ADD CONSTRAINT "field_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "content-model"("id") ON DELETE CASCADE ON UPDATE CASCADE;
