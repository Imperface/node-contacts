const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("dotenv");

config.config();

const { controllerWrapper } = require("../decorators");
const { HttpError } = require("../utils");

const User = require("../models/user");

const { SECRET_KEY } = process.env;

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

const login = async (req, res, next) => {
  // get params from request body
  const { email, password } = req.body;

  // looking for email in db
  const user = await User.findOne({ email });

  // throw error if email not found
  if (user === null) {
    throw HttpError(401, "Email or password is wrong");
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

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  logout: controllerWrapper(logout),
  current: controllerWrapper(current),
  subscriptionUpdate: controllerWrapper(subscriptionUpdate),
};
