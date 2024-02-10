const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const verify = async (req, res, next) => {
  // get params from request params
  const { verificationToken } = req.params;

  // looking for user by verificationToken
  const user = await User.findOne({ verificationToken });

  // throw error if user not found
  if (user === null) {
    throw HttpError(404, "User not found");
  }

  // update user, verify = true, verificationToken = ""
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  // send response
  res.status(200).json({ message: "Verification successful" });
};

module.exports = verify;
