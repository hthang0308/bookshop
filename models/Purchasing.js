const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchasingSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
    },
    items: [
      {
        book: Object,
        quantity: Number,
        _id: false,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);
module.exports = mongoose.model("purchasings", PurchasingSchema);
