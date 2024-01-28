const Joi = require("joi");
const { emailRegex } = require("../constants");

const contactsAddSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": `name should be a type of 'string'`,
    "string.empty": `name cannot be an empty field`,
    "any.required": `missing required name field`,
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": `email should be a type of 'email'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `missing required email field`,
    "string.pattern.base": "wrong email format",
  }),
  phone: Joi.string().trim().required().messages({
    "string.base": `phone should be a type of 'string'`,
    "string.empty": `phone cannot be an empty field`,
    "any.required": `missing required phone field`,
  }),
  favorite: Joi.boolean(),
});

const contactsUpdateSchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.base": `name should be a type of 'string'`,
    "string.empty": `name cannot be an empty field`,
  }),
  email: Joi.string().pattern(emailRegex).messages({
    "string.base": `email should be a type of 'email'`,
    "string.empty": `email cannot be an empty field`,
    "string.pattern.base": "wrong email format",
  }),
  phone: Joi.string().trim().messages({
    "string.base": `phone should be a type of 'string'`,
    "string.empty": `phone cannot be an empty field`,
  }),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    "object.min": "body cannot be empty",
  });

const contactsUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().messages({
    "boolean.base": `favorite should be a type of 'boolean'`,
  }),
})
  .min(1)
  .messages({
    "object.min": "body cannot be empty",
  });

module.exports = {
  contactsAddSchema,
  contactsUpdateSchema,
  contactsUpdateStatusSchema,
};
