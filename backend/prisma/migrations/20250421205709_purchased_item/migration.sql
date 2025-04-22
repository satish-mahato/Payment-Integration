-- CreateTable
CREATE TABLE "purchasedItem" (
    "id" SERIAL NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchasedItem_pkey" PRIMARY KEY ("id")
);
