require("dotenv").config();

const Book = require("../models/Book");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const rp = require("request-promise");

const checkConstraints = async (Book) => {
  return true;
};

class BooksController {
  // [GET] /api/book/search
  async search(req, res, next) {
    let { q, page, perPage } = req.query;
    try {
      let result = [];
      if (q) {
        const queryRegex = new RegExp(q, "i");
        const bookName = await Book.find({ bookName: queryRegex });
        const description = await Book.find({ description: queryRegex });
        const slug = await Book.find({ slug: queryRegex });

        result = bookName.concat(description, slug);
        result = result.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t.slug == thing.slug)
        );
      } else result = await Book.find({});
      if (!page) page = 1;
      if (!perPage) perPage = result.length;

      page = parseInt(page);
      perPage = parseInt(perPage);

      const totalPages = Math.ceil(result.length / perPage);
      if (page > totalPages)
        return res.status(200).json({
          message: "Search successfully",
          content: {
            currentPage: page,
            totalPages: totalPages,
            totalItems: result.length,
            perPage: perPage,
            items: [],
          },
        });
      else
        return res.status(200).json({
          message: "Search successfully",
          content: {
            currentPage: page,
            totalPages: totalPages,
            totalItems: result.length,
            perPage: perPage,
            items: result.slice(
              (page - 1) * perPage,
              (page - 1) * perPage + perPage
            ),
          },
        });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // // [GET] /api/book/my-books
  // async getMyBooks(req, res, next) {
  //   const { username } = req.query;
  //   return res.status(200).json({
  //     message: "Search successfully",
  //   });
  //   // try {
  //   //   const result = await Book.find({ tutor: username });
  //   //   res.status(200).json({
  //   //     message: "Get your Books successfully",
  //   //     content: result,
  //   //   });
  //   // } catch (err) {
  //   //   res.status(500).json({ message: "Server error" });
  //   // }
  // }

  // [POST] /api/book/create
  async create(req, res, next) {
    const isValid = await checkConstraints(req.body);
    //get latest item in mongodb
    const latestBook = await Book.findOne({}).sort({ _id: -1 });
    if (!latestBook) {
      req.body.slug = "book-1";
    } else {
      req.body.slug = "book-" + (parseInt(latestBook.slug.split("-")[1]) + 1);
    }
    if (!isValid)
      return res
        .status(400)
        .json({ message: "Given Book's information is invalid" });
    try {
      const newBook = await Book.create(req.body);
      res.status(200).json({
        message: "Create a new Book successfully",
        content: newBook._doc,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // [PUT] /api/book/rate
  async rate(req, res, next) {
    const isValid = await checkConstraints(req.body);
    if (!isValid)
      return res
        .status(400)
        .json({ message: "Given book's information is invalid" });
    const { book, rating } = req.body;

    try {
      let existingBook = await Book.findOne({ slug: book });
      if (!existingBook)
        return res.status(400).json({ message: "Book does not exist" });

      const foundIndex = existingBook.rating.findIndex(
        (item) => item.username == rating.username
      );
      if (foundIndex != -1) {
        existingBook.rating[foundIndex].star = rating.star;
        existingBook.rating[foundIndex].comment = rating.comment;
        existingBook.rating[foundIndex].isPurchased = rating.isPurchased;
      } else existingBook.rating.push(rating);
      console.log(rating);
      console.log(existingBook.rating);
      const updatedCourse = await Book.findOneAndUpdate(
        { slug: book },
        { rating: existingBook.rating },
        { new: true }
      );

      res.status(200).json({
        message: "Rate successfully",
        content: updatedCourse._doc,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Server error" });
    }
  }

  // [PUT] /api/book/update
  async update(req, res, next) {
    const isValid = await checkConstraints(req.body);
    if (!isValid)
      return res
        .status(400)
        .json({ message: "Given Book's information is invalid" });
    const { slug } = req.body;
    try {
      const updatedBook = await Book.findOneAndUpdate(
        { slug: slug },
        req.body,
        { new: true }
      );
      if (!updatedBook)
        return res.status(400).json({ message: "Book does not exist" });
      res.status(200).json({
        message: "Change Book's info successfully",
        content: updatedBook._doc,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // [DELETE] /api/book/delete
  async delete(req, res, next) {
    const { slug } = req.body;
    try {
      const temp = await Book.deleteOne({ slug });
      if (!temp.deletedCount)
        return res.status(400).json({ message: "Book does not exist" });

      res.status(200).json({ message: "Delete successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // [GET] /api/book/detail
  async getBookDetail(req, res, next) {
    const { book } = req.query;
    // console.log(book);
    try {
      const existingBook = await Book.findOne({ slug: book });
      if (!existingBook)
        return res.status(400).json({ message: "Book does not exist" });

      return res.status(200).json({
        message: "Get Book detail successfully",
        content: existingBook,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
}

module.exports = new BooksController();
