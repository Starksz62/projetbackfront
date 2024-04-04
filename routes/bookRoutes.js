const express = require("express");
const router = express.Router();
const {getBooks,getBooksById,createBook,modifyBook,deleteBook} = require("../controllers/booksController")
const TokenAuth = require ("../middleware/validateTokenAuth")
const multer = require("../middleware/multer")
const validateBook = require("../middleware/validateBook")

router.route("/").get(getBooks).post( multer,validateBook, createBook);
router.route("/:id").get(getBooksById).put(TokenAuth, validateBook, modifyBook).delete(TokenAuth,multer,deleteBook);



module.exports = router;