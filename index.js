const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const config = require("./src/config/config");
const cors = require("cors");
const PORT = config.port || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cors());
// Atau mengonfigurasi opsi cors kustom
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200,
    mode: "no-cores",
  })
);

const cartRoute = require("./src/routes/cart.route");
const productRoute = require("./src/routes/product.route");
const homepageRoute = require("./src/routes/homepage.route");
const loginRoute = require("./src/routes/login.route");
const registerRoute = require("./src/routes/register.route");
const userRoute = require("./src/routes/user.route");
const adminRoute = require("./src/routes/admin.route");

app.use("/api/cart", cartRoute);
app.use("/api/product", productRoute);
app.use("/api/homepage", homepageRoute);
app.use("/api/login", loginRoute);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

app.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`);
});
