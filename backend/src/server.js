const express = require("express");
const { PORT, FRONTEND_URL, LOCAL_HOST } = require("./config/serverConfig.js");
const apiRoutes = require("./routes/apiRoutes.js");
const cors = require("cors");
const app = express();
app.use(express.json());


const allowedOrigins = [FRONTEND_URL, LOCAL_HOST];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
   
  })
);

app.use("/api", apiRoutes);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/test.html");
});
app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
