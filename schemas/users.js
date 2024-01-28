const Joi = require("joi");

const { emailRegex } = require("../constants");

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
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({
      "any.required": `missing required subscription field`,
    }),
});

module.exports = {
  userSchema,
  subscriptionUpdateSchema,
};
