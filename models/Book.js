const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    bookName: {
      type: String,
      require: true,
    },

    slug: {
      type: String,
      require: true,
      unique: true,
    },
    fee: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
      default: "#",
    },
    rating: [
      {
        username: String,
        star: Number,
        _id: false,
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("books", BookSchema);
