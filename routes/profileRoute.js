module.exports = async (req, res) => {
  const userData = req.userData;
  console.log(userData);
  res.status(200).send({ userData });
};
