const { Router } = require("express");
const router = Router();
const createRoutes = require("./createItem/createItem.js");
router.use("/create", createRoutes);
module.exports = router;
