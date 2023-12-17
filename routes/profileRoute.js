module.exports = async (req, res) => {
  const userData = {
    id: req.userData.id,
    email: req.userData.email,
    firstName: req.userData.firstName,
    lastName: req.userData.lastName,
    phoneNumber: req.userData.custom.fields.phoneNumber,
    address: req.userData?.addresses?.[0],
  };

  res.status(200).send({ userData });
};
