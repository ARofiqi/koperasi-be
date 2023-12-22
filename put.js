const { v4: uuidv4 } = require('uuid');

const productId = "snlg01";
const updateData = {
    name: "dtop",
    price: 7000,
    category: "makanan",
    detail: "Terbuat dari ayam pilihan yang murni",
    rating: 4.5,
    uuid: uuidv4()
  };
  
  fetch(`http://localhost:8000/product/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((err) => console.error("error : ", err));