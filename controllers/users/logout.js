const { HttpError } = require("../../utils");

const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  // get id
  const { _id } = req.user;

  // clear token from user
  const updatedContact = await User.findByIdAndUpdate(
    _id,
    { token: "" },
    { new: true }
  );

  // throw error if user not found
  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  // send response
  res.status(204).json();
};

const current = async (req, res, next) => {
  // get params
  const { email, subscription } = req.user;

  // send response
  res.status(200).json({ email, subscription });
};
module.exports = logout;
