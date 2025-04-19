const express = require("express");
const { PORT } = require("./config/serverConfig");
const app = express();
app.get("/", (req, res) => {
  res.json({
    msg: "hello",
  });
});
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
