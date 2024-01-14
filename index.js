const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routes = require("./src/routes/index");
const config = require("./src/config/config");
const cors = require('cors');

app.use(bodyParser.json());
app.use("/", routes);
app.use(cors());

// Atau mengonfigurasi opsi cors kustom
// app.use(cors({
//   origin: 'http://example.com',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   optionsSuccessStatus: 204,
// }));


const PORT = config.port || 8000;

app.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`);
});
