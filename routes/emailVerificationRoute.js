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
      uri: `/airexpress/customers/email-token`,
      body: data,
    });

    const emailVerificationToken = tokenResponse.body.value;

    const verificationResponse = await client.execute({
      method: "POST",
      uri: `/airexpress/customers/email/confirm`,
      body: { tokenValue: emailVerificationToken },
    });

    res.status(200).send({
      isEmailVerified: verificationResponse.body.isEmailVerified == true,
    });
  } catch (error) {
    res.status(400).send({ isEmailVerified: false, message: error });
  }
};
