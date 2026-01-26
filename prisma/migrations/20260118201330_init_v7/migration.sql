/*
  Warnings:

  - You are about to drop the column `longLogo` on the `Card` table. All the data in the column will be lost.
  - Added the required column `longLogoId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "longLogo",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "longLogoId" TEXT NOT NULL,
ALTER COLUMN "bgColor" SET DEFAULT '#fbbf24',
ALTER COLUMN "borderColor" SET DEFAULT '#fbbf24',
ALTER COLUMN "textColor" SET DEFAULT '#000000';

-- CreateTable
CREATE TABLE "Logo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Logo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Logo_name_key" ON "Logo"("name");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_longLogoId_fkey" FOREIGN KEY ("longLogoId") REFERENCES "Logo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
