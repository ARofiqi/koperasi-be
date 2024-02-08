const config = require("../config/config");
const jwt = require("jsonwebtoken");
const db = require("../connection/db");

// function authenticateToken(req, res, next) {
//   const token = req.header("Authorization");

//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, secretKey, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "Token tidak ditemukan" });

  jwt.verify(token.split(" ")[1], config.secretKey, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token tidak valid" });
    db.query("SELECT * FROM user_account WHERE id = ?", [decoded.id], (error, results) => {
      if (error) {
        return res.status(401).json({ message: "Token tidak valid" });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: "Token tidak valid" });
      }
      req.id = decoded.id;
      next();
    });
  });
}

module.exports = { verifyToken };
