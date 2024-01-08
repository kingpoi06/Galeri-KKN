require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const pLimit = require('p-limit');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const images = [
//   './images/9.jasa-instalasi-listrik.jpg',
//   './images/10.jasa-interior-furniture.jpg',
//   './images/11.jasa-pembuatan-pagar.jpg',
//   './images/12.jasa-baja-ringan-atap.jpg',
//   './images/13.jasa-pengecoran.jpg',
//   './images/14.jasa-sumur-bor.jpg',
//   './images/15.jasa-buat-kolam-renang.jpg'
// ];

const images = [];


(async function run() {

  const limit = pLimit(2);

  const imagesToUpload = images.map((image) => {
    return limit(async () => {
      const result = await cloudinary.uploader.upload(image);
      console.log(`Successfully uploaded ${image}`);
      console.log(`> Result: ${result.secure_url}`);
      return result;
    })
  });

  await Promise.all(imagesToUpload);
})();