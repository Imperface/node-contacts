const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const { EMAIL_REGEX, SUBSCRIPTION_VALUE } = require("../constants");
const userSchema = new Schema(
  {
    email: {
      type: String,
      match: EMAIL_REGEX,
      required: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true, trim: true },
    subscription: {
      type: String,
      enum: SUBSCRIPTION_VALUE,
      default: "starter",
    },
    token: { type: String, default: "" },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

const userJOISchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
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
  subscription: Joi.string().valid(...SUBSCRIPTION_VALUE),
});

const subscriptionUpdateSchema = Joi.object({
  subscription: Joi.string()
    .valid(...SUBSCRIPTION_VALUE)
    .required()
    .messages({
      "any.required": `missing required subscription field`,
    }),
});

const verifyEmailSchema = Joi.object({
  email: Joi.string().pattern(EMAIL_REGEX).required().messages({
    "string.base": `email should be a type of 'string'`,
    "string.empty": `email cannot be an empty field`,
    "any.required": `missing required email field`,
    "string.pattern.base": "wrong email format",
  }),
});
const schemas = {
  userJOISchema,
  subscriptionUpdateSchema,
  verifyEmailSchema,
};
const User = model("user", userSchema);
module.exports = { User, schemas };
