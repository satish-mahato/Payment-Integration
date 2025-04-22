const prisma = require("../prisma/client.js");
const { getEsewaPaymentHash } = require("../utils/esewa.js");
const { randomUUID } = require("crypto");

const createItemService = async (itemData) => {
  try {
    return await prisma.$transaction(async (prisma) => {
      const transaction_uuid = randomUUID().toLowerCase();
      const item = await prisma.item.create({
        data: {
          itemName: itemData.itemName,
          totalPrice: itemData.totalPrice,
        },
      });

      const purchasedItem = await prisma.purchasedItem.create({
        data: {
          totalPrice: itemData.totalPrice,
          paymentMethod: "esewa",
          status: "pending",
          transactionId: transaction_uuid,
        },
      });
      const paymentHash = await getEsewaPaymentHash({
        amount: itemData.totalPrice,
        transaction_uuid: purchasedItem.transactionId,
      });

      return { item, purchasedItem, paymentHash };
    });
  } catch (error) {
    throw new Error("Failed to create items in database");
  }
};
const verifyPaymentService = async (encodedData) => {
  let decodedData = Buffer.from(encodedData, "base64").toString("utf-8");
  decodedData = JSON.parse(decodedData);

  const { transaction_uuid } = decodedData;

  const updatedItem = await prisma.purchasedItem.update({
    where: {
      transactionId: transaction_uuid,
    },
    data: {
      status: "completed",
      decodedData: decodedData,
    },
  });

  return {
    success: true,
    message: "Payment verified and item updated successfully",
    data: { updatedItem },
  };
};

module.exports = { createItemService, verifyPaymentService };
