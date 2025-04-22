/*
  Warnings:

  - You are about to drop the `purchasedItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "purchasedItem";

-- CreateTable
CREATE TABLE "purchased_items" (
    "id" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" TEXT NOT NULL,
    "decodedData" JSONB,

    CONSTRAINT "purchased_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "purchased_items_transactionId_key" ON "purchased_items"("transactionId");
