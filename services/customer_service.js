const { client } = require("../utils/commercetools.js");

const getAllCustomers = async () => {
  try {
    const response = await client.execute({
      method: "GET",
      uri: "/airtim1-webshop-i-cms/customers",
    });

    console.log(response.body);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getAllCustomers };
