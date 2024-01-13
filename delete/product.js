const productId = 'd22e67b3-5c1e-4394-bceb-657c48327011';

  fetch(`http://localhost:8000/product/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("Response:", data))
    .catch((err) => console.error("error : ", err));
    