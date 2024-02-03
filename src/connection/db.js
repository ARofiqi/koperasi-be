const mysql = require("mysql");
const config = require("../config/config");

const connection = mysql.createConnection({
  host: config.db.host || "localhost",
  user: config.db.username || "root",
  password: config.db.password || "",
  database: config.db.database || "koperasi",
  port: config.db.port || 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database = ", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

module.exports = connection;
