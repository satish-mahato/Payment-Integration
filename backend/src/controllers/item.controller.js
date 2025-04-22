const prisma = require("../prisma/client.js");
const {
   createItemService,
   verifyPaymentService,
} = require("../services/item.service.js");

const createItem = async (req, res) => {
  try {
    const newItem = await createItemService(req.validatedData);
    res.status(201).json({
      message: "Item Created Successfully",
      success: true,
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create item" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { data } = req.query;

    if (!data) {
      return res.status(400).json({ error: "Missing data parameter" });
    }

    const result = await verifyPaymentService(data);
    return res.json(result);
  } catch (error) {
    console.error("Error in verifyPayment:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = { createItem, verifyPayment };