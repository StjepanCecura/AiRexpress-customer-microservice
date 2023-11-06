const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const emailVerificationRoute = require("./routes/emailVerificationRoute.js");
const createCustomerRoute = require("./routes/createCustomerRoute.js");
const loginCustomerRoute = require("./routes/loginCustomerRoute.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/register", createCustomerRoute);
app.post("/login", loginCustomerRoute);
app.put(`/email-verification`, emailVerificationRoute);

app.listen(port, () => {
  console.log(`Customer service on port: ${port}`);
});
