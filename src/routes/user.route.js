const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");

const table = "user";

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userResults = await queryPromise(`SELECT * FROM ${table} WHERE user_id = ?`, [id]);

    const mostProduct = userResults[0].mostProduct.split(",").map(Number);
    const dataMostProduct = await Promise.all(mostProduct.map((e) => queryPromise(`SELECT * FROM produk WHERE id = ?`, [e])));

    userResults[0].mostProduct = dataMostProduct;
    response(200, userResults, "Successfully fetching data user", res);
  } catch (error) {
    console.error("Error fetching user or product:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

function queryPromise(sql, params) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = router;
