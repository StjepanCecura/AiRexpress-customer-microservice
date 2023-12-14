const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.body.token;
  console.log("Verify JWT", token);

  try {
    const userData = jwt.verify(token, jwtSecret);
    res.status(200).send({
      message: "JWT is valid!",
      user: userData,
    });
  } catch (error) {
    res.status(403).send({
      message: "JWT not valid!",
    });
  }
};
