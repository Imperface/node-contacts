const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
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

module.exports = model("Contact", contactSchema);
