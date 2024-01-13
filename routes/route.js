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
  
//END POINT CART
router.get("/cart", (req, res) => {
  db.query('SELECT * FROM cart', (error, results) => {
    if (error) {
            console.error('Error fetching cart', error);
            res.status(500).json({message: 'Internal Server Error'});
        } else{
            res.json(results)
        }
  });
});
  
router.get('/cart/:id', (req,res) => {
  const cartId = req.params.id;
  db.query('SELECT * FROM cart WHERE id = ?', [cartId], (error, results) => {
      if (error) {
          console.error('Error fetching cart', error);
          res.status(500).json({message: 'Internal Server Error'});
      } else if (results.length === 0) {
          res.status(404).json({message: 'cart not found'});
      } else {
          res.json(results);
      }
  });
});

//METHOD POST
//POST PRODUCT
router.post('/product/:id', (req, res) => {
  const {id, name, price, category, detail, rating} = req.body;
  db.query('INSERT INTO product (id, name, price, category, detail, rating) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, price, category, detail, rating], (error) => {
          if (error) {
              console.error('Error creating product:', error);
              response(500,"ERROR", "User can't get list", res);
          } else {
            response(200,"ok mantap", "User get list", res)
          }
      });
});

//POST CART
router.post('/cart/:id', (req, res) => {
  const {id, name, price , quantity, totalHarga} = req.body;
  db.query('INSERT INTO cart (id, name, price, quantity, totalHarga) VALUES (?, ?, ?, ?, ?)',
      [id, name, price, quantity, totalHarga], (error) => {
          if (error) {
              console.error('Error creating product:', error);
              response(500,"ERROR", "User can't get list", res);
          } else {
            response(200,"ok mantap", "User get list", res)
          }
      });
});

//METHOD PUT
router.put('/product/:id', (req,res) => {
  const productId = req.params.id;
  const {name, price, category, detail, rating} = req.body;
  db.query('UPDATE product SET name = ?, price = ?, category = ?, detail= ?, rating = ?  WHERE id= ?',
  [name, price , category, detail, rating, productId], (error) => {
      if (error) {
          console.error('Error updating product:', error);
          res.status(500).json({message: 'Internal Server Error'});
      } else{
          res.json("Updating product Succesfullys")
      }
  })
})

//DELETE
router.delete('/product/:id', (req, res) => {
  const productid = req.params.id;
  db.query('DELETE FROM product WHERE id = ?', [productid], (error) => {
      if (error) {
          console.error('Error deleting product:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          res.json("Deleting product successfully");
      }
  });
});

router.delete('/cart/:id', (req, res) => {
  const productid = req.params.id;
  db.query('DELETE FROM cart WHERE id = ?', [productid], (error) => {
      if (error) {
          console.error('Error deleting product:', error);
          res.status(500).json({ message: 'Internal Server Error' });
      } else {
          res.json("Deleting product successfully");
      }
  });
});

module.exports = router;
