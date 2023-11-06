module.exports = async (req, res) => {
  const userData = req.userData;

  res.status(200).send({ userData });
};
