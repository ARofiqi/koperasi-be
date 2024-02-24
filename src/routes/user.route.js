const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");
<<<<<<< HEAD
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy((username, password, done) => {
    connection.query(
      "SELECT * FROM user WHERE username = ?",
      [username],
      (err, results) => {
        if (err) return done(err);

        if (!results.length) {
          return done(null, false, { message: "username tidak ditemukan" });
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password salah" });
          }
        });
      }
    );
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  connection.query("SELECT * FROM user WHERE id = ?", [id], (err, results) => {
    if (err) return done(err);
    const user = results[0];
    done(null, user);
  });
});
=======
const { verifyToken } = require("../middleware/user");

router.get("/", verifyToken, async (req, res) => {
  try {
    const id = req.id;
    const userResults = await queryPromise(`SELECT * FROM user WHERE account_id = ?`, [id]);

    // const mostProduct = userResults[0].mostProduct.split(",").map(Number);
    const mostProduct = [1,2,3];
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
>>>>>>> 9da5eea716e1e4d9efa97131a282be5226ca6fa2

module.exports = router;
