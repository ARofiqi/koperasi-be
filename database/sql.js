const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  const dbName = "db_test";

  connection.query(`SHOW DATABASES LIKE '${dbName}'`, (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      connection.query(`CREATE DATABASE ${dbName}`, (err) => {
        if (err) throw err;
        console.log(`Database ${dbName} created`);
      });
    } else {
      console.log(`Database ${dbName} already exists`);
    }
  });
});
