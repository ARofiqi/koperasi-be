const { v4: uuidv4 } = require('uuid');

const data = {
  id: "27193559-5355-49b9-ba53-09f947d91964",
  name: "PIZZA",
  price: 10000,
  quantity: 2,
  totalHarga: 10000*2
};

fetch(`http://localhost:8000/cart/${data.id}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.error("error : ", err));