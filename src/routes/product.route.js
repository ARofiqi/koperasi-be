const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");

//GET /product/
router.get("/", (req, res) => {
  db.query("SELECT * FROM product", (error, results) => {
    if (error) {
      console.error("Error fetching mahasiswa", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

//GET /product/:id
router.get("/:id", (req, res) => {
  const productId = req.params.id;
  db.query("SELECT * FROM product WHERE id = ?", [productId], (error, results) => {
    if (error) {
      console.error("Error fetching product", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else if (results.length === 0) {
      res.status(404).json({ message: "product not found" });
    } else {
      res.json(results);
    }
  });
});

//METHOD POST
//POST PRODUCT
router.post("/:id", (req, res) => {
  const { id, name, price, category, detail, rating } = req.body;
  db.query("INSERT INTO product (id, name, price, category, detail, rating) VALUES (?, ?, ?, ?, ?, ?)", [id, name, price, category, detail, rating], (error) => {
    if (error) {
      console.error("Error creating product:", error);
      response(500, "ERROR", "User can't get list", res);
    } else {
      response(200, "ok mantap", "User get list", res);
    }
  });
});

//METHOD PUT
router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const { name, price, category, detail, rating } = req.body;
  db.query("UPDATE product SET name = ?, price = ?, category = ?, detail= ?, rating = ?  WHERE id= ?", [name, price, category, detail, rating, productId], (error) => {
    if (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json("Updating product Succesfullys");
    }
  });
});

//DELETE
router.delete("/:id", (req, res) => {
  const productid = req.params.id;
  db.query("DELETE FROM product WHERE id = ?", [productid], (error) => {
    if (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json("Deleting product successfully");
    }
  });
});

module.exports = router;