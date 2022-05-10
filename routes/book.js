const express = require("express");
const router = express.Router();
const booksController = require("../controllers/BookController");

const verifyToken = require("../middleware/auth");

// router.post("/new-meeting", coursesController.newMeeting);
router.delete("/delete", verifyToken, booksController.delete);
router.put("/update", verifyToken, booksController.update);
// router.put("/rate", verifyToken, booksController.rate);
router.post("/create", booksController.create);
//router.get("/my-books", booksController.getMyBooks);
router.get("/detail", booksController.getBookDetail);
router.get("/search", booksController.search);

module.exports = router;
