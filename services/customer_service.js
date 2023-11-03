const { client } = require("../utils/commercetools.js");

const createCustomer = async (userData) => {
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
      uri: "/airtim1-webshop-i-cms/customers",
      body: newCustomer,
    });

    const customerId = response.body.customer.id;
    console.log(`Sending email to ${userData.email}`);

    const mailOptions = {
      from: "airexpress@gmail.com",
      to: userData.email,
      subject: "Mail verification",
      html: `<p>To verify you email address, click on the following link: <a href='http://localhost:3000/customer/email-verification/${customerId}'>http://localhost:3000/customer/email-verification/${customerId}</a></p>`,
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

    return { status: "OK", message: "New customer created" };
  } catch (error) {
    console.log("Error creating new customer!");
    return {
      error,
    };
  }
};

const verifyCustomer = async (customerId) => {
  const data = {
    id: customerId,
    ttlMinutes: 5000,
  };

  try {
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

    return verificationResponse;
  } catch (error) {
    return error;
  }
};

module.exports = { createCustomer, verifyCustomer };
