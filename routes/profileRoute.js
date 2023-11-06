module.exports = async (req, res) => {
  const userData = {
    id: req.userData.iq,
    email: req.userData.email,
    firstName: req.userData.firstName,
    phoneNumber: req.userData.phoneNumber,
  };

  res.status(200).send({ userData });
};
