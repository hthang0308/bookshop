const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchasingSchema = new Schema(
  {
    book: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    count: {
      type: Number,
      require: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("purchasings", PurchasingSchema);
