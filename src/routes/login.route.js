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
      if (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(500).json({ message: "Akun Tidak DItemukan" });
      }

      const isPasswordValid = await bcrypt.compare(password, results[0].password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Autentikasi gagal" });
      }
      const token = jwt.sign({ id: results[0].id }, secretKey, { expiresIn: "1h" });

      res.json({ token });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
