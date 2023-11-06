module.exports = async (req, res) => {
  const userData = {
    id: req.userData.id,
    email: req.userData.email,
    firstName: req.userData.firstName,
    phoneNumber: req.userData.custom.fields.phoneNumber,
  };

  res.status(200).send({ userData });
};
