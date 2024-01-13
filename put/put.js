

const productId = "103c7702-a09b-11ee-9e3e-005056c00008";
const updateData = {
    name: "dtop",
    price: 7000,
    category: "makanan",
    detail: "Terbuat dari ayam pilihan yang murni",
    rating: 4.5,
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