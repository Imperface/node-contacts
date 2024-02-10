const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../utils");
const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  // get params from request body
  const { email } = req.body;

  // looking for user by email
  const user = await User.findOne({ email });

  // throw error if user not found
  if (user === null) {
    throw HttpError(404, "User not found");
  }

  // throw error if user already verified
  if (user.verify === true) {
    throw HttpError(400, "Verification has already been passed");
  }

  // create letter object for sending
  const emailBody = {
    to: email,
    subject: "Verification account",
    html: `Follow the <a href = "${BASE_URL}/api/users/verify/${user.verificationToken}" rel="noopener noreferrer" target = "_blank">link</a> to verify your account`,
    text: `Follow the link to verify your account ${BASE_URL}/api/users/verify/${user.verificationToken}`,
  };

  // send mail
  await sendEmail(emailBody);

  // send response
  res.status(200).json({ message: "Verification email sent" });
};

module.exports = resendVerifyEmail;
