const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");
const config = require("./src/config/config");


app.use(bodyParser.json());
app.use("/", routes);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`);
});
