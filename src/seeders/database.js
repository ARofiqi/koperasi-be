const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3307,
});

connection.connect((err) => {
  if (err) {
    console.error("Kesalahan koneksi ke database:", err.message);
    return;
  }

  console.log("Terhubung ke MySQL");

  const databaseName = "koperasi";
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;

  connection.query(createDatabaseQuery, (error, results) => {
    if (error) {
      console.error("Kesalahan saat membuat database:", error.message);
    } else {
      console.log("Database berhasil dibuat:", results);
    }

    // // Pilih database yang baru dibuat
    // connection.changeUser({ database: databaseName }, (error) => {
    //   if (error) {
    //     console.error("Kesalahan saat memilih database:", error.message);
    //   } else {
    //     console.log(`Database ${databaseName} dipilih`);
    //   }

    //   // Definisikan pernyataan SQL untuk membuat tabel
    //   const createTableProduct = `
    //     CREATE TABLE IF NOT EXISTS product (
    //       id INT PRIMARY KEY,
    //       nama VARCHAR(255),
    //       umur INT
    //     )
    //   `;

    //   // Eksekusi pernyataan SQL untuk membuat tabel
    //   connection.query(createTableProduct, (error, results) => {
    //     if (error) {
    //       console.error("Kesalahan saat membuat tabel:", error.message);
    //     } else {
    //       console.log("Tabel berhasil dibuat:", results);
    //     }

    //     // Tutup koneksi ke MySQL
    //     connection.end();
    //   });
    connection.end();
  });
});
