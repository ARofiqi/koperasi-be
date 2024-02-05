const config = require("../config/config");
const jwt = require("jsonwebtoken");

// Secret key untuk JWT, sebaiknya simpan di environment variable
const secretKey = config.secretKey;

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
