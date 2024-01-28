const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../utils");
const { emailRegex } = require("../constants");
const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegex,
      required: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true, trim: true },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: { type: String, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userSchema.post("save", handleMongooseError);

module.exports = model("user", userSchema);
