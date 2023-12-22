const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require("./routes/route");

app.use(bodyParser.json());
app.use("/", routes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`);
});
