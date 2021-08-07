const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "User" }
);

const ResetPass = new mongoose.Schema(
  {
    username: { type: String, required: true },
    mail_id: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
  },
  { collection: "Password Reset" },
  { timestamps: true }
);
ResetPass.index({ createdAt: 1 }, { expireAfterSeconds: 1800 });

const ReesetPass = mongoose.model("ResetPass", ResetPass);
const User = mongoose.model("User", userSchema);
module.exports = { User, ReesetPass };
