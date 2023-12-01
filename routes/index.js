const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Halaman Utama");
});

router.get("/about", (req, res) => {
  res.send("Tentang Kami");
});

module.exports = router;
