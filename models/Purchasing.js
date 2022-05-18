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
        book: String,
        quantity: Number,
        _id: false,
      },
    ],
  },
  { versionKey: false }
);
module.exports = mongoose.model("purchasings", PurchasingSchema);
