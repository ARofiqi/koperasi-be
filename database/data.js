const mysql = require('mysql');

// Konfigurasi koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: '', // Ganti dengan password MySQL Anda
  database: 'koperasi', // Ganti dengan nama database yang diinginkan
});

// Membuat database
connection.query('CREATE DATABASE IF NOT EXISTS koperasi', (err) => {
  if (err) throw err;

  // Menggunakan database yang baru dibuat
  connection.query('USE koperasi', (err) => {
    if (err) throw err;

    // Membuat tabel cart
    connection.query(
        "CREATE TABLE IF NOT EXISTS cart (id VARCHAR(36) PRIMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL(10, 2) NOT NULL, quantity INT(10) NOT NULL,totalHarga INT(10))"
    , (err) => {
      if (err) throw err;

      // Menyisipkan data produk
      const cart = {
        id: 'uuid',
        name: 'chicken fiesta',
        price: 5000,
        quantity: 1,
        totalHarga: 5000,
      };

      connection.query('INSERT INTO cart SET ?', cart, (err) => {
        if (err) throw err;

        console.log('Database, tabel, dan data produk berhasil dibuat!');
        connection.end(); // Menutup koneksi setelah selesai
      });
    });
  });
});
