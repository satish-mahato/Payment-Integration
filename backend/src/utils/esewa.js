const crypto = require("crypto");
const { secretKey, productCode } = require("../config/serverConfig.js");

const getEsewaPaymentHash = async ({ amount, transaction_uuid }) => {
  try {
    const data = `total_amount=${amount},transaction_uuid=${transaction_uuid},product_code=${productCode}`;

    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      productCode

    };
  } catch (error) {
    throw error;
  }
};
module.exports = { getEsewaPaymentHash };

