const express = require("express");
const router = express.Router();
const booksRouter = require("./routes/bookRoutes");
const userRouter = require("./routes/userRoutes");

router.use("/books", booksRouter);
router.use("/users", userRouter);

module.exports = router;
