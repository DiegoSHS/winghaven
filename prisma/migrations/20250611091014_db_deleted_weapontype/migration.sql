/*
  Warnings:

  - You are about to drop the column `type` on the `Weapon` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Weapon_type_idx";

-- AlterTable
ALTER TABLE "Weapon" DROP COLUMN "type";
