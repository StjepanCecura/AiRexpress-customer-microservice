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
          phoneNumber: {
            en: userData.phone,
          },
          emailVerified: {
            en: "false",
          },
        },
      },
    };

    const response = await client.execute({
      method: "POST",
      uri: "/airtim1-webshop-i-cms/customers",
      body: newCustomer,
    });

    console.log(response);

    return { status: "OK", message: "New customer created" };
  } catch (error) {
    return { error };
  }
};

module.exports = { createCustomer };
