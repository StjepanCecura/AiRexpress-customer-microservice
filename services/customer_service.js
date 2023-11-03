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
          emailVerified: "false",
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
  const updateData = {
    version: 1,
    actions: [
      {
        action: "setCustomField",
        name: "emailVerified",
        value: "true",
      },
    ],
  };

  try {
    const response = await client.execute({
      method: "POST",
      uri: `/airtim1-webshop-i-cms/customers/${customerId}`,
      body: updateData,
    });

    return response;
  } catch (error) {
    return error;
  }
};

module.exports = { createCustomer, verifyCustomer };
