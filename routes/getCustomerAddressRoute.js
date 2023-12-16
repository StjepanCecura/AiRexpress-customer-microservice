const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { client } = require("../utils/commercetools.js");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const token = req.cookie.token;
    const customerData = jwt.verify(token, jwtSecret);
    res.status(200).send(customerData?.addresses?.[0]);
  } catch (error) {
    console.log(`Error while updating profile info! ${error}`);
    res.status(503).send({ error });
  }
};
