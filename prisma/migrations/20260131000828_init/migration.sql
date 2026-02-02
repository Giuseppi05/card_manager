/*
  Warnings:

  - You are about to drop the column `affiliationId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `bgColor` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `borderColor` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `classId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `longLogoId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `textureId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `overrideBgColor` on the `CardVariant` table. All the data in the column will be lost.
  - You are about to drop the column `overrideBorderColor` on the `CardVariant` table. All the data in the column will be lost.
  - You are about to drop the column `overrideTextColor` on the `CardVariant` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the `CardTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MoveTags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TagMovement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Affiliation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CardType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CardVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Expansion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Generation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Logo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Texture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserCardVariant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserGame` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TagCategory" AS ENUM ('CARD', 'MOVE');

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_affiliationId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_classId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_longLogoId_fkey";

-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_textureId_fkey";

-- DropForeignKey
ALTER TABLE "CardTags" DROP CONSTRAINT "CardTags_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardTags" DROP CONSTRAINT "CardTags_tagId_fkey";

-- DropForeignKey
ALTER TABLE "MoveTags" DROP CONSTRAINT "MoveTags_moveId_fkey";

-- DropForeignKey
ALTER TABLE "MoveTags" DROP CONSTRAINT "MoveTags_tagId_fkey";

-- AlterTable
ALTER TABLE "Affiliation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "affiliationId",
DROP COLUMN "bgColor",
DROP COLUMN "borderColor",
DROP COLUMN "classId",
DROP COLUMN "longLogoId",
DROP COLUMN "textColor",
DROP COLUMN "textureId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CardType" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CardVariant" DROP COLUMN "overrideBgColor",
DROP COLUMN "overrideBorderColor",
DROP COLUMN "overrideTextColor",
ADD COLUMN     "bgColor" TEXT DEFAULT '#fbbf24',
ADD COLUMN     "borderColor" TEXT DEFAULT '#fbbf24',
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "longLogoId" TEXT,
ADD COLUMN     "textColor" TEXT DEFAULT '#000000',
ADD COLUMN     "textureId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "variantName" SET DEFAULT 'default';

-- AlterTable
ALTER TABLE "Class" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Expansion" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Logo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "type",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "typeId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Texture" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserCard" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserCardVariant" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserGame" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "CardTags";

-- DropTable
DROP TABLE "MoveTags";

-- DropTable
DROP TABLE "TagCard";

-- DropTable
DROP TABLE "TagMovement";

-- CreateTable
CREATE TABLE "MoveType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MoveType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "TagCategory" NOT NULL DEFAULT 'CARD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CardToClass" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CardToClass_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CardToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CardToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_MoveToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MoveToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_AffiliationToCard" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AffiliationToCard_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoveType_name_key" ON "MoveType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_CardToClass_B_index" ON "_CardToClass"("B");

-- CreateIndex
CREATE INDEX "_CardToTag_B_index" ON "_CardToTag"("B");

-- CreateIndex
CREATE INDEX "_MoveToTag_B_index" ON "_MoveToTag"("B");

-- CreateIndex
CREATE INDEX "_AffiliationToCard_B_index" ON "_AffiliationToCard"("B");

-- AddForeignKey
ALTER TABLE "CardVariant" ADD CONSTRAINT "CardVariant_textureId_fkey" FOREIGN KEY ("textureId") REFERENCES "Texture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardVariant" ADD CONSTRAINT "CardVariant_longLogoId_fkey" FOREIGN KEY ("longLogoId") REFERENCES "Logo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "MoveType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToClass" ADD CONSTRAINT "_CardToClass_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToClass" ADD CONSTRAINT "_CardToClass_B_fkey" FOREIGN KEY ("B") REFERENCES "Class"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToTag" ADD CONSTRAINT "_CardToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToTag" ADD CONSTRAINT "_CardToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoveToTag" ADD CONSTRAINT "_MoveToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Move"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MoveToTag" ADD CONSTRAINT "_MoveToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliationToCard" ADD CONSTRAINT "_AffiliationToCard_A_fkey" FOREIGN KEY ("A") REFERENCES "Affiliation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AffiliationToCard" ADD CONSTRAINT "_AffiliationToCard_B_fkey" FOREIGN KEY ("B") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
