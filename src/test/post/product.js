const { v4: uuidv4 } = require('uuid');

const postdata = {
  id: uuidv4(),
  name: "PIZZA",
  price: 10000,
  category: "makanan",
  detail: "Terbuat dari sabun pilihan yang murni",
  rating: 4.5,
};

fetch(`http://localhost:8000/product/:id`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(postdata),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("error : ", err));
  