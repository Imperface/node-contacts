const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { randomUUID } = require("crypto");

const { BASE_URL } = process.env;

const { HttpError, sendEmail } = require("../../utils");

const { User } = require("../../models/user");

const register = async (req, res, next) => {
  // get params from request body
  const { email, password, subscription = "starter" } = req.body;

  // check uniq email
  const checkUniqEmail = await User.findOne({ email });

  // throw error if email found in db
  if (checkUniqEmail !== null) {
    throw HttpError(409, "Email in use");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // get avatarURL from gravatar
  const avatarURL = gravatar.url(email);

  // generate verificationToken
  const verificationToken = randomUUID();

  // create user
  const registeredUser = await User.create({
    email,
    subscription,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });

  // throw error if user not created
  if (registeredUser === null) {
    throw HttpError(400, "Bad request");
  }

  // create letter object for sending
  const emailBody = {
    to: email,
    subject: "Verification account",
    html: `Follow the <a href = "${BASE_URL}/api/users/verify/${verificationToken}" rel="noopener noreferrer" target = "_blank">link</a> to verify your account`,
    text: `Follow the link to verify your account ${BASE_URL}/api/users/verify/${verificationToken}`,
  };

  // send mail
  await sendEmail(emailBody);

  // send response
  res.status(201).json({ user: { email, subscription, avatarURL } });
};

module.exports = register;
