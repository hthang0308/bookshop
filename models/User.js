const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    fullname: {
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
    password: {
      type: String,
      require: true,
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
