CREATE TABLE IF NOT EXISTS produk (
id INT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price INT NOT NULL,
category VARCHAR(50),
detail TEXT,
rating INT,
quantity INT
);

-- Tabel user
CREATE TABLE IF NOT EXISTS user (
id VARCHAR(36) PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
noTelephone VARCHAR(15) NOT NULL,
saldo INT NOT NULL,
pemasukan INT NOT NULL,
pengeluaran INT NOT NULL,
mostProduct VARCHAR(255),
account_id VARCHAR(36),
FOREIGN KEY (account_id) REFERENCES user_account(id)
);

-- Kolom untuk menyimpan produk yang sering dibeli

-- Menambahkan data ke tabel user
INSERT INTO user (user_id, name, email, noTelephone, saldo, pemasukan, pengeluaran, mostProduct)
VALUES (1, 'Abdurrahman', 'Abdurrahman12@gmail.com', '0812345678', 350000, 400000, 40000, '1,3,2'),
(2, 'Budi', 'Budi34@gmail.com', '0876543210', 500000, 300000, 200000, '2,1,3'),
(3, 'Citra', 'Citra56@gmail.com', '0811122334', 750000, 600000, 200000, '3,2,1'),
(4, 'Dewi', 'Dewi78@gmail.com', '0812345678', 420000, 350000, 80000, '1,2,3'),
(5, 'Eko', 'Eko90@gmail.com', '0876543210', 280000, 200000, 120000, '2,3,1');

-- Membuat tabel cart
CREATE TABLE IF NOT EXISTS cart (
id VARCHAR(36) PRIMARY KEY,
user_id VARCHAR(36) NOT NULL,
product_id INT NOT NULL,
quantity INT NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES user(id),
FOREIGN KEY (product_id) REFERENCES produk(id)
);

CREATE TABLE user_account (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(50) NOT NULL,
password VARCHAR(255) NOT NULL,
role ENUM('admin', 'user') NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
