const { client } = require("../utils/commercetools.js");
const bcrypt = require("bcrypt");

const createCustomer = async (userData) => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newCustomer = {
      firstName: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      custom: {
        type: {
          key: "customer-phone",
          typeId: "type",
        },
        fields: {
          phone: {
            en: userData.phone,
          },
        },
      },
    };

    const response = await client.execute({
      method: "POST",
      uri: "/airtim1-webshop-i-cms/customers",
      body: newCustomer,
    });

    return { status: "OK", message: "New customer created" };
  } catch (error) {
    return { error };
  }
};

module.exports = { createCustomer };
