const express = require("express");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/apiRoutes.js");
const app = express();
app.use(express.json());

app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
