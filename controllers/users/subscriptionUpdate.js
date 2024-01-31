const { HttpError } = require("../../utils");

const { User } = require("../../models/user");

const subscriptionUpdate = async (req, res, next) => {
  // get subscription
  const { subscription } = req.body;

  // get params
  const { _id, email } = req.user;

  // update subscription
  const updatedContact = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );

  // throw error if user not found
  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  // send response
  res.status(200).json({ email, subscription });
};
module.exports = subscriptionUpdate;
