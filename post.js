const { v4: uuidv4 } = require('uuid');

const postdata = {
  id: "fs120",
  name: "chiken fiesta",
  price: 5000,
  category: "makanan",
  detail: "Terbuat dari sabun pilihan yang murni",
  rating: 4.5,
  uuid: uuidv4()
};

fetch(`http://localhost:8000/product/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postdata),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("error : ", err));