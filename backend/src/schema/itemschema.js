const { z } = require("zod");
const itemsSchema = z.object({
    itemName: z.string()
    .min(3, "Name must be at least three characters")
    .max(50, "Name cannot exceed 50 characters")
    .nonempty("Item name is required"),
  totalPrice: z.number()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
});
module.exports = { itemsSchema };
