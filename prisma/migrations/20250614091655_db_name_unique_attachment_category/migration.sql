/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AttachmentCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AttachmentCategory_name_key" ON "AttachmentCategory"("name");
