const { Router } = require("express");
const validateRequest = require("../../validator/validation");
const { itemsSchema } = require("../../schema/itemschema");
const { createItem, verifyPayment } = require("../../controllers/item.controller.js");
const router = Router();
router.post("/", validateRequest(itemsSchema), createItem);

router.get('/verify', verifyPayment);
module.exports = router;
