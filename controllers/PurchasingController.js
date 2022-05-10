require("dotenv").config();

const Purchasing = require("../models/Purchasing");
const Book = require("../models/Book");
const User = require("../models/User");

class PurchasingController {
  // [POST] /api/purchasing/purchase
  async purchase(req, res, next) {
    const { book, username } = req.body;
    try {
      const bookInfo = await Book.findOne({ slug: book });
      if (!bookInfo) return res.status(400).json({ message: "Book does not exist" });
      console.log(username);
      //const bookEndingDate = new Date(bookInfo.endingDate);
      //const currentDate = new Date();
      //if (currentDate > bookEndingDate) return res.status(400).json({ message: "Time is over" });

      const existingUser = await User.findOne({ username });
      if (!existingUser) return res.status(404).json({ message: "User does not exist" });
      const newBalance = existingUser.balance - bookInfo.fee;
      if (newBalance < 0) return res.status(404).json({ message: "User does not have enough money" });
      const updatedUser = await User.findOneAndUpdate({ username }, { balance: newBalance }, { new: true });

      //const temp = await Purchasing.findOne({ book, username });
      //if (temp) return res.status(400).json({ message: "User have already this book" });
      const newEnrollment = await Purchasing.create({
        book,
        username,
      });

      res.status(200).json({
        message: "Buy successfully",
        content: newEnrollment._doc,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

  //   // [GET] /api/Purchasing/my-enrollment
  //   async getMyEnrollment(req, res, next) {
  //     const { username } = req.query;

  //     try {
  //       const books = await Purchasing.find({ username });
  //       if (!books) return res.status(500).json({ message: "User have no enrollment" });

  //       const result = await Promise.all(
  //         books.map(async (book) => {
  //           const temp = await book.findOne({ slug: book.book });
  //           return temp;
  //         })
  //       );

  //       res.status(200).json({
  //         message: "Find successfully",
  //         content: result,
  //       });
  //     } catch (err) {
  //       res.status(500).json({ message: "Server error" });
  //     }
  //   }

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
