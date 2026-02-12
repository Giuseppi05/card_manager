/*
  Warnings:

  - You are about to drop the column `logo` on the `Expansion` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Generation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CardVariant" ADD COLUMN     "borderInternalColor" TEXT DEFAULT '#fbbf24';

-- AlterTable
ALTER TABLE "Expansion" DROP COLUMN "logo";

-- AlterTable
ALTER TABLE "Generation" DROP COLUMN "image";
