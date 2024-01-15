const { client } = require("../utils/commercetools.js");

module.exports = async (req, res) => {
  try {
    const customerId = req.userData.id;
    const customerVersion = req.userData.version;

    const response = await client.execute({
      method: "DELETE",
      uri: `/airexpress/customers/${customerId}?version=${customerVersion}`,
    });

    if (response.statusCode == 200) {
      res.clearCookie("token");
      res.status(200).send({ message: "Account deleted!" });
    }
    res.status(401).send({
      message: `Error while deleting account!`,
    });
  } catch (error) {
    console.log(`Error while deleting customer account: ${error}`);
    res.status(401).send({
      message: `Error while deleting account! ${error}`,
    });
  }
};
