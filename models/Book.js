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
    categories: {
      type: Array,
      require: true,
    },
    authorName: {
      type: String,
      require: true,
    },
    publisherName: {
      type: String,
      require: true,
    },
    price: {
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
    inStock: {
      type: Boolean,
      default: true,
    },
    rating: [
      {
        username: String,
        star: Number,
        comment: {
          type: String,
          default: "No comment",
        },
        postedAt: {
          type: Date,
          default: Date.now,
        },
        helpful: {
          type: Number,
          default: 0,
        },
        isPurchased: {
          type: Boolean,
          default: false,
        },
        _id: false,
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoose.model("books", BookSchema);
