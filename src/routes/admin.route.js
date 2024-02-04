const express = require("express");
const router = express.Router();
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/admin");

// Secret key untuk JWT, sebaiknya simpan di environment variable
const secretKey = config.secretKey;

// Contoh model pengguna
const User = { username: "Admin", password: "Admin" };

// Rute untuk login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Gantilah ini dengan validasi pengguna dari database
  //   const user = await User.findOne({ username });

  if (User.password != password && User.username != username) {
    return res.status(401).json({ message: "Autentikasi gagal" });
  }

  // Buat token JWT
  const token = jwt.sign({ username: User.username }, secretKey, { expiresIn: "1h" });

  res.json({ token });
});

// Rute terproteksi yang membutuhkan token untuk akses
router.get("/dashboard", authenticateToken, (req, res) => {
  res.json({ message: "Halaman Admin terproteksi" });
});

module.exports = router;
