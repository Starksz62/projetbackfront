const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  modifyUser,
  userLogin,
} = require("../controllers/usersController");
const TokenAuth = require ("../middleware/validateTokenAuth")

router.route("/").get(getUsers).post(createUser);
router.post("/login", userLogin);
router.use(TokenAuth);
router.route("/:id").get(getUserById).put(modifyUser);


module.exports = router;
