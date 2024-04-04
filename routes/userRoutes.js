const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  modifyUser,
  userLogin,
} = require("../controllers/usersController");
const TokenAuth = require ("../middleware/validateTokenAuth");
const validateUser = require ("../middleware/validateUser")

router.route("/").get(getUsers).post(validateUser,createUser);
router.post("/login", userLogin);
router.use(TokenAuth);
router.route("/:id").get(getUserById).put(modifyUser);


module.exports = router;
