-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);
