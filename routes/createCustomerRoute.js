const { client } = require("../utils/commercetools.js");

module.exports = async (req, res) => {
  const userData = req.body;

  try {
    const newCustomer = {
      firstName: userData.name,
      lastName: userData.lastname,
      email: userData.email,
      password: userData.password,
      custom: {
        type: {
          key: "customer-custom-fields",
          typeId: "type",
        },
        fields: {
          phoneNumber: userData.phone,
        },
      },
    };

    const response = await client.execute({
      method: "POST",
      uri: "/airexpress/customers",
      body: newCustomer,
    });

    const customerId = response.body.customer.id;
    console.log(`Sending email to ${userData.email}`);

    const mailOptions = {
      from: "airexpress@gmail.com",
      to: userData.email,
      subject: "Mail verification",
      html: `<p>To verify you email address, click on the following link: <a href='http://localhost:3000/email-verification/${customerId}'>http://localhost:3000/email-verification/${customerId}</a></p>`,
    };

    fetch("http://mail_service:4003", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailOptions),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));

    res.status(200).send({ message: "New customer created" });
  } catch (error) {
    console.log("Error creating new customer!");
    res.status(503).send({
      message: error,
    });
  }
};
