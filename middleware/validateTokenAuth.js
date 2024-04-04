const jwt = require("jsonwebtoken")

const TokenAuth = (req, res , next) => {
let token;
const authHeader = req.headers.authorization || req.headers.Authorization;
if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.APP_TOKEN, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: "L'utilisateur n'est pas autorisé." });
        }else {
            req.user = decoded;
        next();
        }
    })
} else {
    return res.status(401).json({ message: "Token d'authentification requis." });
  }

}
module.exports = TokenAuth;