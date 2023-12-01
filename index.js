const express = require("express");
const app = express();

const routes = require("./routes");

app.use("/", routes);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`);
});
