/*
  Warnings:

  - Added the required column `image` to the `Loadout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Loadout" ADD COLUMN     "image" TEXT NOT NULL;
