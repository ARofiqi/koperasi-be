const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");
const { verifyToken } = require("../middleware/user");
const { v4: uuidv4 } = require("uuid");

const table = "cart";

router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = await new Promise((resolve, reject) => {
      db.query("SELECT id FROM user WHERE account_id = ?", [req.id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results[0].id);
        }
      });
    });

    const cartData = await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table} WHERE user_id = ?`, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    const listID = cartData.map((item) => item.product_id);

    let data = [];

    await Promise.all(
      listID.map(async (item, index) => {
        try {
          const [produk] = await new Promise((resolve, reject) => {
            db.query("SELECT * FROM produk WHERE id = ?", [item], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            });
          });

          data.push({
            id: cartData[index].id,
            name: produk.name,
            price: produk.price,
            quantity: cartData[index].quantity,
            totalHarga: produk.price * cartData[index].quantity,
          });
        } catch (error) {
          console.error("Error fetching product:", error.message);
        }
      })
    );
    response(200, data, "Successfully fetching data cart", res);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    response(500, { message: "Internal Server Error" }, "Failed fetching data cart", res);
  }
});

router.post("/", verifyToken, async (req, res) => {
  const id = uuidv4();
  const account_id = req.id;
  const { product_id, quantity } = req.body.headers;

  db.query("SELECT id FROM user WHERE account_id = ?", [account_id], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user_id = results[0].id;

    db.query("INSERT INTO cart (id, user_id, product_id, quantity) VALUES (?, ?, ?, ?)", [id, user_id, product_id, quantity], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
      res.status(201).json({ message: "Product created successfully" });
    });
  });
});

router.delete("/:id", (req, res) => {
  const cart_id = req.params.id;

  db.query("DELETE FROM cart WHERE id = ?", [cart_id], (error) => {
    if (error) {
      console.error("Error deleting product:", error.message);
      response(500, { message: "Internal Server Error" }, "Failed deleting product in cart", res);
    }
    response(200, { message: "Deleting product in cart successfully" }, "Deleting product in cart successfully", res);
  });
});

module.exports = router;
