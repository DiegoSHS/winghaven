/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `WeaponCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeaponCategory_name_key" ON "WeaponCategory"("name");
