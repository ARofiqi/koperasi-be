const { v4: uuidv4 } = require("uuid");
const mysql = require("mysql");
const data = require("../../public/dataProduct");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: 3307,
  database: "koperasi",
});

connection.connect((err) => {
  if (err) {
    console.error("Kesalahan koneksi ke database:", err.message);
    return;
  }

  const databaseName = "koperasi";
  // Pilih database yang baru dibuat
  connection.changeUser({ database: databaseName }, (error) => {
    if (error) {
      console.error("Kesalahan saat memilih database:", error.message);
    } else {
      console.log(`Database ${databaseName} dipilih`);
    }
  });

  // Definisikan pernyataan SQL untuk membuat tabel
  const createTableProduct = `
        CREATE TABLE IF NOT EXISTS product (
          id VARCHAR(36) PRIMARY KEY, 
          name VARCHAR(255) NOT NULL, 
          price DECIMAL(10, 2) NOT NULL, 
        )
      `;

  // Eksekusi pernyataan SQL untuk membuat tabel
  connection.query(createTableProduct, (error, results) => {
    if (error) {
      console.error("Kesalahan saat membuat tabel:", error.message);
    } else {
      console.log("Tabel berhasil dibuat:", results);
    }

    const insertDataQuery = `
  INSERT INTO product (id, nama, umur) VALUES
  (1, 'Rofiqi', 20),
  (2, 'Chisato', 18),
  (3, 'Rofiqi', 20),
  (4, 'Chisato', 18)
  (5, 'Rofiqi', 20),
  (6, 'Chisato', 18)
`;

    // Jalankan query untuk menambahkan data
    connection.query(insertDataQuery, (err, results) => {
      if (err) {
        console.error("Gagal menambahkan data :", err.message);
        return;
      }
      console.log("Berhasil menambahkan data :", results);
    });

    // Tutup koneksi ke MySQL
    connection.end();
  });
});
