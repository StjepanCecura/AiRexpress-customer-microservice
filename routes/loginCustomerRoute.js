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
      uri: "/airexpress/me/login",
      body: userData,
    });

    if (response.body.customer.isEmailVerified === false) {
      res.status(406).send({
        message: "Email not verified!",
      });
      return;
    }
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
