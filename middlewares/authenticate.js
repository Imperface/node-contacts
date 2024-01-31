const { User } = require("../models/user");

const jwt = require("jsonwebtoken");

const { HttpError } = require("../utils");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { _id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id });
    if (user === null || user.token === "" || user.token !== token) {
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authenticate;
