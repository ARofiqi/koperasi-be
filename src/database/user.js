const mysql = require('mysql');
const { v4: uuidv4 } = require("uuid");

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

    // Membuat tabel user
    connection.query(
      `CREATE TABLE IF NOT EXISTS user (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(100) NOT NULL CHECK (LENGTH(name) BETWEEN 3 AND 100),
        username VARCHAR(255) NOT NULL UNIQUE CHECK (username LIKE '%@%' AND LENGTH(username) <= 255),
        password VARCHAR(255) NOT NULL
        )`
      , (err) => {
        if (err) throw err;

        // Menyisipkan data user
        const user = {
          id: uuidv4(),
          name: 'John Doe',
          username: 'john.doe@example.com',
          password: '12345'
        };

        connection.query('INSERT INTO user SET ?', user, (err) => {
          if (err) throw err;

          console.log('Database, tabel, dan data user berhasil dibuat!');
          connection.end(); // Menutup koneksi setelah selesai
        });
      });
  });
});
