require("dotenv").config();

const Purchasing = require("../models/Purchasing");
const Book = require("../models/Book");
const User = require("../models/User");

class PurchasingController {
  // [POST] /api/purchasing/purchase
  async purchase(req, res, next) {
    try {
      const { username, items } = req.body;
      const existingUser = await User.findOne({ username });
      if (!existingUser)
        return res.status(404).json({ message: "User does not exist" });
      var totalprice = 0;
      for (const item of items) {
        // console.log(1);
        // const book = await Book.findOne({ slug: item.book });
        // if (!book) return res.status(500).json({ message: "Book not found" });
        // console.log(1);
        totalprice += item.book.price * item.quantity;
      }
      const newBalance = existingUser.balance - totalprice;
      if (newBalance < 0)
        return res.status(500).json({ message: "Not enough balance" });
      await User.findOneAndUpdate(
        { username },
        { balance: newBalance },
        { new: true }
      );
      const newPurchasing = await Purchasing.create({
        username,
        items,
      });
      res.status(200).json({
        message: "Buy books successfully",
        content: newPurchasing._doc,
        newBalance,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // [GET] /api/purchasing/my-purchase
  async getMyPurchase(req, res, next) {
    const { username } = req.query;

    try {
      const allpurchases = await Purchasing.find({ username });
      if (!allpurchases)
        return res.status(500).json({ message: "User have no purchase" });
      res.status(200).json({
        message: "Find successfully",
        content: allpurchases,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

  //   // [PUT] /api/Purchasing/get-credit
  //   async getCredit(req, res, next) {
  //     const { book } = req.body;

  //     try {
  //       const bookInfo = await book.findOne({ slug: book });
  //       if (!bookInfo) return res.status(400).json({ message: "book does not exist" });

  //       const bookEndingDate = new Date(bookInfo.endingDate);
  //       const currentDate = new Date();
  //       if (currentDate < bookEndingDate) return res.status(400).json({ message: "The book have not been ended" });

  //       // get total of money for the tutor
  //       const userList = await Purchasing.find({ book });
  //       const sumMoney = userList.map((user) => user.fee).reduce((prev, next) => prev + next);
  //       // top up to tutor
  //       const tutor = await User.findOne({ username: bookInfo.tutor });
  //       const newBalance = tutor.balance + sumMoney;
  //       const updatedTutor = await User.findOneAndUpdate({ username: bookInfo.tutor }, { balance: newBalance }, { new: true });

  //       // update fee of Purchasing
  //       const temp = await Purchasing.updateMany({ book }, { fee: 0 });

  //       res.status(200).json({ message: "Get credit successfully" });
  //     } catch (err) {
  //       res.status(500).json({ message: "Server error" });
  //     }
  //   }
}

module.exports = new PurchasingController();
