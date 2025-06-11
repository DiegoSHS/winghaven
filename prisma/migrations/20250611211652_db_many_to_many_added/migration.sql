/*
  Warnings:

  - You are about to drop the column `loadoutId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `loadoutId` on the `Weapon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_loadoutId_fkey";

-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_attachmentId_fkey";

-- DropForeignKey
ALTER TABLE "Weapon" DROP CONSTRAINT "Weapon_loadoutId_fkey";

-- AlterTable
ALTER TABLE "Attachment" DROP COLUMN "loadoutId";

-- AlterTable
ALTER TABLE "Loadout" ADD COLUMN     "weaponId" INTEGER;

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "loadoutId";

-- CreateTable
CREATE TABLE "WeaponAttachment" (
    "weaponId" INTEGER NOT NULL,
    "attachmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WeaponAttachment_pkey" PRIMARY KEY ("weaponId","attachmentId")
);

-- CreateTable
CREATE TABLE "LoadoutAttachment" (
    "loadoutId" INTEGER NOT NULL,
    "attachmentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoadoutAttachment_pkey" PRIMARY KEY ("loadoutId","attachmentId")
);

-- AddForeignKey
ALTER TABLE "WeaponAttachment" ADD CONSTRAINT "WeaponAttachment_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeaponAttachment" ADD CONSTRAINT "WeaponAttachment_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loadout" ADD CONSTRAINT "Loadout_weaponId_fkey" FOREIGN KEY ("weaponId") REFERENCES "Weapon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadoutAttachment" ADD CONSTRAINT "LoadoutAttachment_loadoutId_fkey" FOREIGN KEY ("loadoutId") REFERENCES "Loadout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoadoutAttachment" ADD CONSTRAINT "LoadoutAttachment_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "Attachment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
