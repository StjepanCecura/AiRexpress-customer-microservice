const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createCustomer } = require("./services/customer_service.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.post("/", async (req, res) => {
  const userData = req.body;
  const response = await createCustomer(userData);

  res.send(response);
});

app.listen(port, () => {
  console.log(`User service on port: ${port}`);
});
