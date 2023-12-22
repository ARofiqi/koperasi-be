const express = require("express");
const router = express.Router();
const db = require("../connection/db")
const response = require("../respons")

router.get("/", (req,res) =>{
  db.query('SELECT id, name, price FROM product', (error, results) => {
    if (error) {
      console.error('Error fetching mahasiswa', error);
      res.status(500).json({message: 'Internal Server Error'});
  } else{
      res.json(results)
  }
  });
  });

//GET /product/
router.get("/product", (req, res) => {
  db.query('SELECT * FROM product', (error, results) => {
    if (error) {
            console.error('Error fetching mahasiswa', error);
            res.status(500).json({message: 'Internal Server Error'});
        } else{
            res.json(results)
        }
  });
});

//GET /product/:id
router.get('/product/:id', (req,res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM product WHERE id = ?', [productId], (error, results) => {
      if (error) {
          console.error('Error fetching product', error);
          res.status(500).json({message: 'Internal Server Error'});
      } else if (results.length === 0) {
          res.status(404).json({message: 'product not found'});
      } else {
          res.json(results);
      }
  });
});

//POST PRODUCT
router.post('/product', (req, res) => {
  const {id, name, price , category, detail, rating, uuid } = req.body;
  db.query('INSERT INTO product (id, name, price, category, detail, rating, uuid) VALUES (?, ?, ?, ?, ?, ?,?)',
      [id, name, price, category, detail, rating, uuid], (error) => {
          if (error) {
              console.error('Error creating product:', error);
              response(500,"ERROR", "User can't get list", res);
          } else {
            response(200,"ok mantap", "User get list", res)
          }
      });
});

router.put('product/:id', (req,res) => {
  const productId = req.params.id;
  const {name, price , category, detail, rating,uuid} = req.body;
  db.query('UPDATE product SET name = ?, price = ?, category = ?, detail= ?, rating = ?, uuid = ? WHERE id= ?',
  [name, price , category, detail, rating,uuid, productId], (error) => {
      if (error) {
          console.error('Error updating product:', error);
          res.status(500).json({message: 'Internal Server Error'});
      } else{
          res.json("Updating product Succesfullys")
      }
  })
})


router.put("/", (req, res) => {
  res.send("Halaman Utama");
});

router.delete("/user", (req, res) => {
    res.send("User")
})

module.exports = router;
