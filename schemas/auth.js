const Joi = require("joi");
const emailRegex =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const userSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": `email should be a type of 'string'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `missing required email field`,
    "string.pattern.base": "wrong email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": `password should be a type of 'string'`,
    "string.empty": `password cannot be an empty field`,
    "any.required": `missing required password field`,
  }),
  subscription: Joi.string(),
});

module.exports = {
  userSchema,
};
