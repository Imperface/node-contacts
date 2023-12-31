const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": `name should be a type of 'string'`,
    "string.empty": `name cannot be an empty field`,
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "string.base": `email should be a type of 'email'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().trim().required().messages({
    "string.base": `phone should be a type of 'string'`,
    "string.empty": `phone cannot be an empty field`,
    "any.required": `missing required phone field`,
  }),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.base": `name should be a type of 'string'`,
    "string.empty": `name cannot be an empty field`,
  }),
  email: Joi.string().email().messages({
    "string.base": `email should be a type of 'email'`,
    "string.empty": `email cannot be an empty field`,
  }),
  phone: Joi.string().trim().messages({
    "string.base": `phone should be a type of 'string'`,
    "string.empty": `phone cannot be an empty field`,
  }),
});

module.exports = { contactAddSchema, contactUpdateSchema };
