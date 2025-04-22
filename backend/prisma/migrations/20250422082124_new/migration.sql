/*
  Warnings:

  - The primary key for the `purchasedItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `purchasedItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `purchasedItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionId` to the `purchasedItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchasedItem" DROP CONSTRAINT "purchasedItem_pkey",
DROP COLUMN "id",
ADD COLUMN     "transactionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "purchasedItem_transactionId_key" ON "purchasedItem"("transactionId");
