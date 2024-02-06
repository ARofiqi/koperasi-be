const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");

const table = "produk";

router.get("/", (req, res) => {
  db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      console.error("Error fetching product", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      const page = parseInt(req.query.page) || 1;
      const totalPages = Math.ceil(results.length / config.itemPerPage);

      response(200, results, "Succesfully fetching data products", res, page, totalPages, "/api/admin/inventory");
    }
  });
});

module.exports = router;
