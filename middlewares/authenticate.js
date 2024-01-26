const config = require("dotenv");
config.config();

const User = require("../models/auth");

const jwt = require("jsonwebtoken");

const { HttpError } = require("../utils");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Unauthorized"));
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id });
    if (user === null) {
      next(HttpError(401, "Unauthorized"));
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, "Unauthorized"));
  }
};

module.exports = authenticate;
