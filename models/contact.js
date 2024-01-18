const { Schema, model, default: mongoose } = require("mongoose");

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    favorite: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Contact", contactSchema);
