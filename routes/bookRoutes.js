const express = require("express");
const router = express.Router();
const {getBooks,getBooksById,createBook,modifyBook,deleteBook} = require("../controllers/booksController")
const TokenAuth = require ("../middleware/validateTokenAuth")

router.route("/").get(getBooks).post(TokenAuth, createBook);
router.route("/:id").get(getBooksById).put(TokenAuth,modifyBook).delete(TokenAuth,deleteBook);



module.exports = router;