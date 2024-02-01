const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { EMAIL_REGEX } = require("../constants");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    favorite: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

// JOI SCHEMAS

const contactsAddSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.base": `name should be a type of 'string'`,
    "string.empty": `name cannot be an empty field`,
    "any.required": `missing required name field`,
  }),
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
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
  email: Joi.string().pattern(EMAIL_REGEX).messages({
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

const schemas = {
  contactsAddSchema,
  contactsUpdateSchema,
  contactsUpdateStatusSchema,
};

const Contact = model("Contact", contactSchema);

module.exports = { Contact, schemas };
