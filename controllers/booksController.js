const models = require("../modelsProviders")

const getBooks = async (req, res, next) => {
  try {
    const books = await models.book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};
const getBooksById = async (req, res) => {
  try {
    const book = await models.book.getBookById(req.params.id);
    if (!book) {
      res.sendStatus(404);
    } else {
      res.json(book);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
  };
  const createBook = async (req, res,next) => {
    const book = req.body;
    if (req.file) {
      book.picture = req.file.path; }
    try {
      const insertId = await models.book.create(book);

      res.status(201).json({message: `le livre ${insertId} a été créé avec succès` });
    } catch (err) {
      next(err);
    }
}
const updateBook = async (req, res) => {
    const { id } = req.params;
    const book = req.body;
    if (req.file) {
      book.picture = req.file.path;
    } try {
    book.id = id;
    const result = await models.book.updateBook(book);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
    };

const deleteBook = (req, res) => {
    const { id } = req.params;
    res.send({message: `Book ${req.params.id} deleted`});
}
module.exports = {getBooks,getBooksById,createBook,updateBook,deleteBook}