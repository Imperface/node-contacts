const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { HttpError } = require("../../utils");

const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  // get params from request body
  const { email, password } = req.body;

  // looking for email in db
  const user = await User.findOne({ email });

  // throw error if email not found
  if (user === null) {
    throw HttpError(401, "Email or password is wrong");
  }

  // throw error if user not verify email
  if (user.verify === false) {
    throw HttpError(401, "Email not verified");
  }

  // compare hashed password in db with password from frontend
  const checkValidPassword = await bcrypt.compare(password, user.password);

  // throw error if compare failed
  if (checkValidPassword === false) {
    throw HttpError(401, "Email or password is wrong");
  }

  // create payload for token
  const payload = {
    _id: user._id,
  };

  // create token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  // add token to user in db
  const updatedContact = await User.findByIdAndUpdate(user._id, { token });

  // throw error if user not found
  if (updatedContact === null) {
    throw HttpError(404, "Not found");
  }

  // send response
  res.status(200).json({
    token,
    user: { email, subscription: user.subscription },
  });
};

module.exports = login;
