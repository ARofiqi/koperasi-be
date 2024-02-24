const mysql = require("mysql");

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
  const createTableCart = `
        CREATE TABLE IF NOT EXISTS cart (
          id INT PRIMARY KEY,
          nama VARCHAR(255),
          umur INT
        )
      `;

  // Eksekusi pernyataan SQL untuk membuat tabel
  connection.query(createTableCart, (error, results) => {
    if (error) {
      console.error("Kesalahan saat membuat tabel:", error.message);
    } else {
      console.log("Tabel berhasil dibuat:", results);
    }

    const insertDataQuery = `
  INSERT INTO cart (id, nama, umur) VALUES
  (1, 'Rofiqi', 20),
  (2, 'Chisato', 18),
  (3, 'Rofiqi', 20),
  (4, 'Chisato', 18),
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
