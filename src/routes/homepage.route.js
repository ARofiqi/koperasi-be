const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");

const table = "product";

router.get("/", (req, res) => {
  // db.query(`SELECT id, name, price, category FROM ${table}`, (error, results) => {
  //   if (error) {
  //     console.error("Error fetching product", error.message);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   } else {
  //     response(200, results, "Succesfully fetching data products", res)
  //   }
  // });
  db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      console.error("Error fetching product", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      response(200, results, "Succesfully fetching data products", res);
    }
  });
});

module.exports = router;
  