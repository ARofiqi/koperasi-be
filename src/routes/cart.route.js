const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");

const table = "cart";

router.get("/", (req, res) => {
  db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      console.error("Error fetching cart", error.message);
      response(500, { message: "Internal Server Error" }, "Failed fetching data cart", res);
    } else {
      response(200, results, "Successfully Updating data cart", res);
    }
  });
});

router.get("/:id", (req, res) => {
  const cartId = req.params.id;
  db.query(`SELECT * FROM ${table} WHERE id = ?`, [cartId], (error, results) => {
    if (error) {
      console.error("Error fetching cart", error.message);
      response(500, { message: "Internal Server Error" }, "Failed fetching data cart", res);
    } else if (results.length === 0) {
      response(404, { message: "cart not found" }, "Failed fetching data cart", res);
    } else {
      response(200, results, "Successfully Updating data cart", res);
    }
  });
});

//POST CART
router.post("/:id", (req, res) => {
  const { id, name, price, quantity, totalHarga } = req.body;
  db.query("INSERT INTO cart (id, name, price, quantity, totalHarga) VALUES (?, ?, ?, ?, ?)", [id, name, price, quantity, totalHarga], (error) => {
    if (error) {
      console.error("Error creating product:", error.message);
      response(500, "ERROR", "User can't get list", res);
    } else {
      response(200, "ok mantap", "User get list", res);
    }
  });
});

router.delete("/:id", (req, res) => {
  const productid = req.params.id;
  db.query("DELETE FROM cart WHERE id = ?", [productid], (error) => {
    if (error) {
      console.error("Error deleting product:", error.message);
      response(500, { message: "Internal Server Error" }, "Failed deleting product", res);
    } else {
      res.json("Deleting product successfully");
    }
  });
});

module.exports = router;
