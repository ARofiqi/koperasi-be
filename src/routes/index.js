const express = require("express");
const router = express.Router();

const cartRoute = require("./cart.route");
const productRoute = require("./product.route");
const homepageRoute = require("./homepage.route");
const userRoute = require("./user.route");

const defaultRoutes = [
  {
    path: "/",
    route: homepageRoute,
  },
  {
    path: "/cart",
    route: cartRoute,
  },
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
