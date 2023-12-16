const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const emailVerificationRoute = require("./routes/emailVerificationRoute.js");
const createCustomerRoute = require("./routes/createCustomerRoute.js");
const loginCustomerRoute = require("./routes/loginCustomerRoute.js");
const JWTMiddleware = require("./middlewares/JWTMiddleware.js");
const profileRoute = require("./routes/profileRoute.js");
const signOutRoute = require("./routes/signOutRoute.js");
const verifyJWTRoute = require("./routes/verifyJWTRoute.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", JWTMiddleware, profileRoute);
app.get("/sign-out", JWTMiddleware, signOutRoute);

app.post("/register", createCustomerRoute);
app.post("/login", loginCustomerRoute);
app.post("/verifyJWT", verifyJWTRoute);

app.put(`/email-verification`, emailVerificationRoute);

app.listen(port, () => {
  console.log(`Customer service on port: ${port}`);
});
