-- AlterTable: Add column as nullable first
ALTER TABLE "Resource" ADD COLUMN     "userId" INTEGER;

-- Backfill existing rows with an existing User ID
UPDATE "Resource" SET "userId" = (SELECT "id" FROM "User" ORDER BY "id" ASC LIMIT 1) WHERE "userId" IS NULL;

-- AlterTable: Enforce NOT NULL constraint
ALTER TABLE "Resource" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
