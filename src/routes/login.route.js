const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { secretKey } = require("../config/config");
const db = require("../connection/db");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password diperlukan" });
    }

    db.query("SELECT * FROM user_account WHERE email = ?", [email], async (error, results) => {
      if (error || results.length === 0) {
        res.status(401).json({ message: "Autentikasi gagal" });
      }

      const isPasswordValid = await bcrypt.compare(password, results[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Autentikasi gagal" });
      }

      const token = jwt.sign({ email: results[0].email }, secretKey, { expiresIn: "1h" });

      res.json({ token });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
