const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");
const { authenticateToken } = require("../middleware/admin");
const { verifyToken } = require("../middleware/user");

const table = "produk";

router.get("/", verifyToken, (req, res) => {
  db.query("SELECT * FROM user_account WHERE id = ?", [req.id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Token tidak valid" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Akun Tidak Ditemukan" });
    }
  });
  db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      console.error("Error fetching product", error.message);
      response(500, { message: "Internal Server Error" }, "Failed fetching data products", res);
    }
    response(200, results, "Succesfully fetching data products", res);
  });
});

router.get("/auth", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Halaman User terproteksi" });
});

module.exports = router;
