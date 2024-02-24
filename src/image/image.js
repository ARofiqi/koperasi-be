const sharp = require('sharp');
const fs = require('fs');

// Path file input dan output
const inputImagePath = 'src/image/IMG_20231010_132321.jpg';
const outputImagePath = 'src/image/image.webp';

// Fungsi untuk mengonversi gambar ke format WebP
function convertToWebP(inputPath, outputPath) {
  sharp(inputPath)
    .webp() // Menggunakan format WebP
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log('Gambar berhasil dikonversi ke WebP:', info);
      }
    });
}

// Panggil fungsi convertToWebP dengan path gambar input dan output
convertToWebP(inputImagePath, outputImagePath);