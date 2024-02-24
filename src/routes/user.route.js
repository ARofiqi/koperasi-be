const express = require("express");
const router = express.Router();
const db = require("../connection/db");
const response = require("../../respons");
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

module.exports = router;
