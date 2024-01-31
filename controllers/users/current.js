const current = async (req, res, next) => {
  // get params
  const { email, subscription } = req.user;

  // send response
  res.status(200).json({ email, subscription });
};
module.exports = current;
