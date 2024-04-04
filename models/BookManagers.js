const  AbstractManager = require("./AbstractManagers")

class BookManagers extends AbstractManager {
    constructor() {
        super({table: "book"})
    }

    async findAll() {
        const [rows] = await this.database.query(
            `SELECT 
            book.id, 
            book.title, 
            book.rating, 
            book.description, 
            book.picture, 
            edition_house_name AS edition_house, 
            genre.genre AS genre, 
            book.isbn, 
            author.name AS author
        FROM ${this.table}
        JOIN author ON book.author_id = author.id
        JOIN genre ON book.genre_id = genre.id
        JOIN edition_house ON book.edition_house_id = edition_house.id `
        );
        return rows;
      }
      async getBookById (id) {
        const [rows] = await this.database.query(
            `SELECT 
            book.id, 
            book.title, 
            book.rating, 
            book.description, 
            book.picture, 
            edition_house_name AS edition_house, 
            genre.genre AS genre, 
            book.isbn, 
            author.name AS author
        FROM ${this.table}
        JOIN author ON book.author_id = author.id
        JOIN genre ON book.genre_id = genre.id
        JOIN edition_house ON book.edition_house_id = edition_house.id 
             WHERE book.id = ?`,
            [id]
          );
          return rows.length ? rows[0] : null;
      }
    async create(book) {
        const [result] = await this.database.query (
            `INSERT INTO ${this.table} (title, rating, description, date, picture, edition_house_id,author_id, genre_id, ISBN) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [book.title, book.rating, book.description, book.date, book.picture, book.edition_house_id,book.author_id, book.genre_id, book.ISBN]
        )
        return result.insertId;
    }
    async updateBook(book) {
        const { id, title, rating, description, date, picture, edition_house_id, author_id, genre_id, ISBN } = book;
        const [result] = await this.database.query(
          `UPDATE ${this.table} SET title = ?, rating = ?, description = ?, date = ?, picture = ?, edition_house_id = ?, author_id = ?, genre_id = ?, ISBN = ? WHERE id = ?`,
          [title, rating, description, date, picture, edition_house_id, author_id, genre_id, ISBN, id]
        );
        return result;
    }
}
module.exports = BookManagers;