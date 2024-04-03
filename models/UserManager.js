const  AbstractManager = require("./AbstractManagers")

class UserManager extends AbstractManager {
    constructor() {
      super({ table: "user" });
    }
    async create(user) {
        const [result] = await this.database.query(
            `insert into ${this.table} (username, mail, password) values (?, ?, ?)`,
            [user.username, user.mail, user.password]
          );
          return result.insertId;
    }
    async findByEmail(mail) {
      const [rows] = await this.database.query(
        `SELECT * FROM ${this.table} WHERE mail = ? LIMIT 1`, [mail]
      );
      return rows.length ? rows[0] : null;
    }
}
module.exports = UserManager;