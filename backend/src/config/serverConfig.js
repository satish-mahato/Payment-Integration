const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const productCode = process.env.productCode;
const secretKey = process.env.secretKey;
const FRONTEND_URL = process.env.FRONTEND_URL;
const LOCAL_HOST = process.env.LOCAL_HOST;

module.exports = { PORT, productCode, secretKey, FRONTEND_URL, LOCAL_HOST };
