const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      next(HttpError(400, error.details.map((err) => err.message).join(", ")));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
