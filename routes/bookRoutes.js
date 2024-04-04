const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBooksById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/booksController");
const TokenAuth = require("../middleware/validateTokenAuth");
const multer = require("../middleware/multer");
const validateBook = require("../middleware/validateBook");

router
  .route("/")
  .get(getBooks)
  .post(TokenAuth, multer, validateBook, createBook);
router
  .route("/:id")
  .get(getBooksById)
  .put( multer, validateBook, updateBook)
  .delete(TokenAuth, deleteBook);

module.exports = router;
