const models = require("../modelsProviders");
const argon2 = require("argon2")
const jwt = require("jsonwebtoken");
const Joi = require('joi');

const getUsers = (req, res) => {
  res.status(200).send({ message: "get all users" });
};
const getUserById = (req, res) => {
  const { id } = req.params;
  res.status(200).send({ message: `Get user with ID ${id}` });
};

const createUser = async (req, res, next) => {
  const { username, mail, password } = req.body;
  try {
    const userAvailable = await models.user.findByEmail(mail);
    if (userAvailable) {
      return res.status(400).json({ message: "Cet email existe déjà." });
    }
    const hashedPassword = await argon2.hash(password)
    const insertId = await models.user.create({ username, mail, password:hashedPassword });
    res.status(201).json({ message: `L'utilisateur ${insertId} a été créé avec succès.` });
  } catch (err) {
    next(err);
  }
};
const modifyUser = async (req, res) => {
  const { id } = req.params;
  res.status(201).send({ message: `user${id} modified` });
};

const userLogin = async (req, res,next ) => {
const {mail, password} = req.body;

 const schema = Joi.object({
    mail: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  });

try {
const userAvailable = await models.user.findByEmail(mail);
const validPassword = userAvailable ? await argon2.verify(userAvailable.password, password) : false;
if (!userAvailable || !validPassword) {
  return res.status(401).json({ message: "Mot de passe ou email incorrect." });
}
delete userAvailable.hashed_password;
const accessToken = jwt.sign({
  id: userAvailable.id, username : userAvailable.username, mail : userAvailable.mail 
},process.env.APP_TOKEN,
{
  expiresIn: "1h",
})
res.cookie("token", accessToken, {
  httpOnly: true,
  sameSite: 'strict',
  secure: process.env.NODE_ENV === 'production', 
});
res.status(200).json({
  token: accessToken,
  user: {
    id: userAvailable.id,
    username: userAvailable.username,
    mail: userAvailable.mail
  },
});
} catch(err) {
  next(err)
}
}

module.exports = { getUsers, getUserById, createUser, modifyUser,userLogin };
