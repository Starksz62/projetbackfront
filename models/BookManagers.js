const  AbstractManager = require("./AbstractManagers")

class BookManagers extends AbstractManager {
    constructor() {
        super({table: "book"})
    }

    async findAll() {
        const [rows] = await this.database.query(
          `SELECT book.id, book.title, book.rating, book.description, book.picture, 
                  book.edition_house_id, book.genre_id, book.isbn, 
                  GROUP_CONCAT(author.name SEPARATOR ', ') AS authors
           FROM ${this.table} book
           LEFT JOIN book_authors ON book.id = book_authors.book_id
           LEFT JOIN authors author ON book_authors.author_id = author.id
           GROUP BY book.id`
        );
        return rows;
      }
    async create(book) {
        const [result] = await this.database.query (
            `INSERT INTO ${this.table} (title, rating, description, date, picture, edition_house_id, genre_id, isbn) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [book.title, book.rating, book.description, book.date, book.picture, book.edition_house_id, book.genre_id, book.isbn]
        )
        return result.insertId;
    }
}
module.exports = BookManagers;