const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");

router.get("/", (req, res) => {
  db.query("SELECT id, name, price FROM product", (error, results) => {
    if (error) {
      console.error("Error fetching mahasiswa", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;