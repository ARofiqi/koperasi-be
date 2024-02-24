const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");
const { authenticateToken } = require("../middleware/admin");
const { verifyToken } = require("../middleware/user");

<<<<<<< HEAD
const table = "product";

router.get("/", (req, res) => {
  db.query(
    `SELECT id, name, price, category FROM ${table}`,
    (error, results) => {
      if (error) {
        console.error("Error fetching product", error.message);
        res.status(500).json({ message: "Internal Server Error" });
      } else {
        response(200, results, "Succesfully fetching data products", res);
      }
    }
  );
=======
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
>>>>>>> 9da5eea716e1e4d9efa97131a282be5226ca6fa2
});

module.exports = router;
