module.exports = async (req, res) => {
  res.clearCookie("token");
  res.status(403).send({
    message: "User signed out!",
  });
};
