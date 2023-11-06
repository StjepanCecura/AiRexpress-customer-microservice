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

    const token = jwt.sign(response.body.customer, jwtSecret, {
      expiresIn: "2h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).send({ message: "Login successful!" });
  } catch (error) {
    res.status(401).send({
      message: "Account with the given credentials not found!",
    });
    return;
  }
};
