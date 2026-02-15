/*
  Warnings:

  - Added the required column `gameId` to the `Affiliation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Logo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Affiliation" ADD COLUMN     "gameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "gameId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Logo" ADD COLUMN     "gameId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Class" ADD CONSTRAINT "Class_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliation" ADD CONSTRAINT "Affiliation_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Logo" ADD CONSTRAINT "Logo_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
