const sharp = require('sharp');
const fs = require('fs');

const inputImagePath = 'src/image/download.jpeg';
const outputImagePath = 'src/image/image.webp';

function convertAndCropToWebP(inputPath, outputPath, resize) {
  if (fs.existsSync(inputPath)) {
    // Baca gambar dari file
    const image = sharp(inputPath);

    // Dapatkan informasi ukuran gambar
    image.metadata((err, metadata) => {
      if (err) {
        console.error(err);
        return;
      }

      // Hitung koordinat agar crop berada di tengah
      const centerX = Math.floor((metadata.width - resize.width) / 2);
      const centerY = Math.floor((metadata.height - resize.height) / 2);

      // Lakukan cropping dengan koordinat yang dihitung
      image.extract({ left: centerX, top: centerY, width: resize.width, height: resize.height });

      // Konversi ke format WebP
      image.webp().toFile(outputPath, (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Gambar berhasil dikonversi ke WebP:', info);
        }
      });
    });
  } else {
    console.error('File input tidak ditemukan.');
  }
}

// Contoh penggunaan: Crop gambar dari koordinat (left, top) ke (right, bottom)
const resize = {
  width: 150,
  height: 120,
};

convertAndCropToWebP(inputImagePath, outputImagePath, resize);