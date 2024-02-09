const current = async (req, res, next) => {
  // get params
  const { email, subscription, avatarURL } = req.user;

  // send response
  res.status(200).json({ email, subscription, avatarURL });
};
module.exports = current;
