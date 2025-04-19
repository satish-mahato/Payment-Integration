const { Router } = require("express");
const validateRequest = require("../../validator/validation");
const { itemsSchema } = require("../../schema/itemschema");
const { createItem } = require("../../controllers/item.controller.js");
const router = Router();
router.post("/", validateRequest(itemsSchema), createItem);
module.exports = router;
