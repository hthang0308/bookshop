const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullname: {
      type: String,
    },
    photoURL: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    city: {
      type: String,
    },
    about: {
      type: String,
    },
    photoURL: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("users", UserSchema);
