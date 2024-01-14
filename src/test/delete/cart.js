const productId = "27193559-5355-49b9-ba53-09f947d91964";

fetch(`http://localhost:8000/cart/${productId}`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => console.log("Response:", data))
  .catch((err) => console.error("error : ", err));
