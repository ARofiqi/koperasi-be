const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../connection/db");
const response = require("../../respons");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    const uuid = uuidv4();
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Email dan password dan confirmPassword diperlukan" });
    }

    if (!password !== !confirmPassword) {
      return res.status(400).json({ message: "Password dan confirmPassword harus sama" });
    }

    db.query("SELECT * FROM user_account WHERE email = ?", [email], async (error, results) => {
      if (error) {
        console.error(error);
      }

      if (results.length > 0) {
        return res.json({ message: "Username sudah digunakan" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      db.query("INSERT INTO user_account (id, email, password) VALUES (?, ?, ?)", [uuid, email, hashedPassword]);

      response(200, { message: "Pengguna berhasil terdaftar" }, "Berhasil Mendaftar", res);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
