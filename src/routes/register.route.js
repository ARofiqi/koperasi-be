const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../connection/db");
const response = require("../../respons");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
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
      const id_user_account = uuidv4();
      db.query("INSERT INTO user_account (id, email, password) VALUES (?, ?, ?)", [id_user_account, email, hashedPassword]);

      const id = uuidv4();
      const name = email.split("@")[0];
      const noTelephone = 0;
      const saldo = 0;
      const pemasukan = 0;
      const pengeluaran = 0;
      const mostProduct = "";
      db.query(
        "INSERT INTO user (id, name, email, noTelephone, saldo, pemasukan, pengeluaran, mostProduct, account_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, name, email, noTelephone, saldo, pemasukan, pengeluaran, mostProduct, id_user_account],
        (error, results) => {
          if (error) {
            console.log(error);
          }
          console.log(results);
        }
      );
      console.log(name);

      response(200, { message: "Pengguna berhasil terdaftar" }, "Berhasil Mendaftar", res);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
});

module.exports = router;
