const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const emailVerificationRoute = require("./routes/emailVerificationRoute.js");
const createCustomerRoute = require("./routes/createCustomerRoute.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post("/", createCustomerRoute);
app.put(`/email-verification`, emailVerificationRoute);

app.listen(port, () => {
  console.log(`User service on port: ${port}`);
});
