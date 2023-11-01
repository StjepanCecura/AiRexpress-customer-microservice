const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { getAllCustomers } = require("./services/customer_service.js");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  getAllCustomers();
});

app.listen(port, () => {
  console.log(`User service on port: ${port}`);
});
