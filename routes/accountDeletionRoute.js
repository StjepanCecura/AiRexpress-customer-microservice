const { client } = require("../utils/commercetools.js");

module.exports = async (req, res) => {
  try {
    const customerId = req.userData.id;
    const customerVersion = req.userData.version;

    const response = await client.execute({
      method: "DELETE",
      uri: `/airexpress/customers/${customerId}?version=${customerVersion}`,
    });

    res.status(200).send({ message: "Account deleted!" });
  } catch (error) {
    console.log(`Error while deleting customer account: ${error}`);
    res.status(401).send({
      message: `Error while deleting account! ${error}`,
    });
  }
};
