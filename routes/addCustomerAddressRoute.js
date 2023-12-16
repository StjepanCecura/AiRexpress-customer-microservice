const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { client } = require("../utils/commercetools.js");

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const country = req.body.country;
    const city = req.body.city;
    const postalCode = req.body.postalCode;
    const streetName = req.body.streetName;
    const streetNumber = req.body.streetNumber;

    const token = req.cookie.token;
    const customerData = jwt.verify(token, jwtSecret);
    const customerId = customerData?.id;
    const version = customerData?.version;

    const response = await client.execute({
      method: "POST",
      uri: `/airexpress/customers/${customerId}`,
      body: {
        version,
        actions: [
          {
            action: "addAddress",
            address: {
              streetName,
              streetNumber,
              postalCode,
              city,
              country,
            },
          },
          {
            action: "setCustomField",
            name: "phoneNumber",
            value: phoneNumber,
          },
          {
            action: "setFirstName",
            firstName,
          },
          {
            action: "setLastName",
            lastName,
          },
        ],
      },
    });

    const newToken = jwt.sign(response.body, jwtSecret, {
      expiresIn: "2h",
    });

    res.cookie("token", newToken, {
      httpOnly: true,
    });

    res.status(200).send({ success: true });
  } catch (error) {
    console.log(`Error while updating profile info! ${error}`);
    res.status(503).send({ error });
  }
};
