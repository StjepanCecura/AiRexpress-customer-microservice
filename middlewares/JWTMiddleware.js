const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    const userData = jwt.verify(token, jwtSecret);
    req.userData = userData;

    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(403).send({
      message: "JWT not valid!",
    });
  }
};
