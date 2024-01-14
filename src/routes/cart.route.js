const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");

//END POINT CART
router.get("/", (req, res) => {
  db.query("SELECT * FROM cart", (error, results) => {
    if (error) {
      console.error("Error fetching cart", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

router.get("/:id", (req, res) => {
  const cartId = req.params.id;
  db.query("SELECT * FROM cart WHERE id = ?", [cartId], (error, results) => {
    if (error) {
      console.error("Error fetching cart", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "cart not found" });
    } else {
      res.json(results);
    }
  });
});

//POST CART
router.post("/:id", (req, res) => {
  const { id, name, price, quantity, totalHarga } = req.body;
  db.query("INSERT INTO cart (id, name, price, quantity, totalHarga) VALUES (?, ?, ?, ?, ?)", [id, name, price, quantity, totalHarga], (error) => {
    if (error) {
      console.error("Error creating product:", error);
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
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json("Deleting product successfully");
    }
  });
});

module.exports = router;
