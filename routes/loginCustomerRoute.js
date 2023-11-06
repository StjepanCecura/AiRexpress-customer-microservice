const { client } = require("../utils/commercetools.js");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  const userData = req.body;

  try {
    const response = await client.execute({
      method: "POST",
      uri: "/airtim1-webshop-i-cms/me/login",
      body: userData,
    });

    const token = jwt.sign(response, jwtSecret, { expiresIn: "2h" });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.send({ status: 200, message: "OK!" });
  } catch (error) {
    res.send({
      status: 400,
      message: "Account with the given credentials not found!",
    });
    return;
  }
};
