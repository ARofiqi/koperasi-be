const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");
const { authenticateToken } = require("../middleware/admin");
const { verifyToken } = require("../middleware/user");

const table = "produk";

router.get("/", verifyToken, async (req, res) => {
  try {
    const userData = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM user_account WHERE id = ?", [req.id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0]);
        }
      });
    });

    if (!userData) {
      return res.status(401).json({ message: "Akun Tidak Ditemukan" });
    }

    const productsData = await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table}`, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    response(200, productsData, "Succesfully fetching data products", res);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/auth", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Halaman User terproteksi" });
});

module.exports = router;
