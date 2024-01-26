const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = require("dotenv");

config.config();

const { controllerWrapper } = require("../decorators");
const { HttpError } = require("../utils");

const User = require("../models/auth");

const { SECRET_KEY } = process.env;

const createHashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

const register = async (req, res, next) => {
  const { email, password } = req.body;

  const checkUniqEmail = await User.findOne({ email });

  if (checkUniqEmail !== null) {
    throw HttpError(409, "The email address is already in use");
  }

  const hashedPassword = await createHashPassword(password);

  const registeredUser = await User.create({ email, password: hashedPassword });

  res.status(201).json(req.body);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user === null) {
    throw HttpError(401, "Email or password invalid");
  }

  const checkValidPassword = await bcrypt.compare(password, user.password);

  const payload = {
    _id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  if (checkValidPassword === false) {
    throw HttpError(401, "Email or password invalid");
  }

  res.status(200).json({ token });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
};
