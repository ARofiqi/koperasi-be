const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    res.json({ email, password, confirmPassword });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
