const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");

const table = "product";

//GET /product/
router.get("/", (req, res) => {
  db.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      console.error("Error fetching products :", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

//GET /product/:id
router.get("/:id", (req, res) => {
  const productId = req.params.id;
  db.query(`SELECT * FROM ${table} WHERE id = ?`, [productId], (error, results) => {
    if (error) {
      console.error("Error fetching product : ", error.message);
      response(500, { message: "Internal Server Error" }, "Failed fetching data products", res);
    } else if (results.length === 0) {
      response(404, { message: "product not found" }, "Failed fetching data products", res);
    } else {
      response(200, results, "Succesfully fetching data products", res);
    }
  });
});

//METHOD POST
//POST PRODUCT
router.post("/:id", (req, res) => {
  const { id, name, price, category, detail, rating } = req.body;
  db.query(`INSERT INTO ${table} (id, name, price, category, detail, rating) VALUES (?, ?, ?, ?, ?, ?)`, [id, name, price, category, detail, rating], (error) => {
    if (error) {
      console.error("Error creating product :", error.message);
      response(500, { message: "Internal Server Error" }, "Failed Adding data products", res);
    } else {
      response(200, { message: "ok mantap" }, "Successfully Adding data products", res);
    }
  });
});


//METHOD PUT
router.put("/:id", (req, res) => {
  const productId = req.params.id;
  const { name, price, category, detail, rating } = req.body;
  db.query(`UPDATE ${table} SET name = ?, price = ?, category = ?, detail= ?, rating = ?  WHERE id= ?`, [name, price, category, detail, rating, productId], (error) => {
    if (error) {
      console.error("Error updating product:", error.message);
      response(500, { message: "Internal Server Error" }, "Failed Adding data products", res);
    } else {
      response(200, { message: "ok mantap" }, "Successfully Updating data products", res);
    }
  });
});

//DELETE
router.delete("/:id", (req, res) => {
  const productid = req.params.id;
  db.query(`DELETE FROM ${table} WHERE id = ?`, [productid], (error) => {
    if (error) {
      console.error("Error deleting product:", error.message);
      response(500, { message: "Internal Server Error" }, "Failed deleting product", res);
    } else {
      response(200, { message: "ok mantap" }, "Successfully deleting product", res);
    }
  });
});

module.exports = router;
