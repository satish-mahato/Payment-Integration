const  prisma  = require("../prisma/client.js");

const createItem = async (itemData) => {
    
  try {
    return await prisma.item.create({
      data: { itemName: itemData.itemName, totalPrice: itemData.totalPrice },
    });
  } catch (error) {
    throw new Error("Failed to create item in database");
  }
};

module.exports = { createItem };
