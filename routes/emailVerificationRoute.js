const { client } = require("../utils/commercetools.js");

module.exports = async (req, res) => {
  const customerId = req.body.id;

  try {
    const data = {
      id: customerId,
      ttlMinutes: 5000,
    };

    const tokenResponse = await client.execute({
      method: "POST",
      uri: `/airtim1-webshop-i-cms/customers/email-token`,
      body: data,
    });

    const emailVerificationToken = tokenResponse.body.value;

    const verificationResponse = await client.execute({
      method: "POST",
      uri: `/airtim1-webshop-i-cms/customers/email/confirm`,
      body: { tokenValue: emailVerificationToken },
    });

    res.send({
      isEmailVerified: verificationResponse.body.isEmailVerified == true,
    });
  } catch (error) {
    res.send({ error: error });
  }
};
