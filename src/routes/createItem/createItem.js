const { Router } = require("express");
const router = Router();
router.get("/", (req, res) => {
  res.json({
    msg: "api create Routes",
  });
});
module.exports = router;
