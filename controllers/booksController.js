const models = require("../modelsProviders")

const getBooks = async (req, res, next) => {
  try {
    const books = await models.book.findAll();
    res.json(books);
  } catch (err) {
    next(err);
  }
};
const getBooksById = (req, res) => {
    const { id } = req.params;
    res.status(200).send({ message: `Get book with ID ${id}` });
  };
  const createBook = async (req, res,next) => {
    const book = req.body;
    try {
      const insertId = await models.book.create(book);

      res.status(201).json({message: `le livre ${insertId} a été créé avec succès` });
    } catch (err) {
      next(err);
    }
}
const modifyBook = (req, res) => {
    const { id } = req.params;
    res.status(201).send({message: `Book ${id} modified`});
}
const deleteBook = (req, res) => {
    const { id } = req.params;
    res.send({message: `Book ${req.params.id} deleted`});
}
module.exports = {getBooks,getBooksById,createBook,modifyBook,deleteBook}