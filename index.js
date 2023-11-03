const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const {
  createCustomer,
  verifyCustomer,
} = require("./services/customer_service.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.put(`/email-verification`, async (req, res) => {
  const customerId = req.body.id;
  const response = await verifyCustomer(customerId);
  res.send(response);
});

app.post("/", async (req, res) => {
  const userData = req.body;
  const response = await createCustomer(userData);

  res.send(response);
});

app.listen(port, () => {
  console.log(`User service on port: ${port}`);
});
