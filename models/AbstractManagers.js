// Import database client
const database = require("../client");

class AbstractManager {
  constructor({ table }) {
    this.table = table;

    this.database = database;
  }

  async findAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);

    return rows;
  }
}


module.exports = AbstractManager;
