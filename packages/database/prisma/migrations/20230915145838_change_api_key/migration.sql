-- AlterTable
ALTER TABLE "ApiKey" ALTER COLUMN "last_used" DROP NOT NULL,
ALTER COLUMN "uses" SET DEFAULT 0;
