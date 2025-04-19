const {
  createItem: createItemService,
} = require("../services/item.service.js");

const createItem = async (req, res) => {
  try {
    const newItem = await createItemService(req.validatedData);
    res
      .status(201)
      .json({
        message: "Item Created Successfully",
        success: true,
        data: newItem,
      });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create item" });
  }
};

module.exports = { createItem };
