-- CreateTable
CREATE TABLE "MoveTags" (
    "id" TEXT NOT NULL,
    "moveId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "MoveTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagMovement" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagMovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CardTags" (
    "id" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "CardTags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MoveTags" ADD CONSTRAINT "MoveTags_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MoveTags" ADD CONSTRAINT "MoveTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "TagMovement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardTags" ADD CONSTRAINT "CardTags_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardTags" ADD CONSTRAINT "CardTags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "TagCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
