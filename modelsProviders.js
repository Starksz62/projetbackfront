const UsersManager = require("./models/UserManager")
const BooksManager = require ("./models/BookManagers")
const managers = [
    UsersManager,
    BooksManager,
]
const models = {};

managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();
  models[manager.table] = manager;
});

module.exports = new Proxy(models, {
  get(obj, prop) {
    if (prop in obj) return obj[prop];
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});