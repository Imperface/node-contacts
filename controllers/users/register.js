const bcrypt = require("bcrypt");

const { HttpError } = require("../../utils");

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

  // create user
  const registeredUser = await User.create({
    email,
    subscription,
    password: hashedPassword,
  });

  // throw error if user not created
  if (registeredUser === null) {
    throw HttpError(400, "Bad request");
  }

  // send response
  res.status(201).json({ user: { email, subscription } });
};
module.exports = register;
