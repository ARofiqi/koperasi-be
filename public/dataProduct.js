const { v4: uuidv4 } = require("uuid");

const data = [
  {
    id: uuidv4(),
    name: "PIZZA",
    price: 10000,
    category: "makanan",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, quo dolores! Sit alias quisquam culpa earum hic distinctio in ea nam tempora qui magni veniam a",
    rating: 4.5,
  },
  {
    id: uuidv4(),
    name: "Kopi",
    price: 2000,
    category: "minuman",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, quo dolores! Sit alias quisquam culpa earum hic distinctio in ea nam tempora qui magni veniam a",
    rating: 3,
  },
  {
    id: uuidv4(),
    name: "Mie Goreng",
    price: 3000,
    category: "makanan",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, quo dolores! Sit alias quisquam culpa earum hic distinctio in ea nam tempora qui magni veniam a",
    rating: 5,
  },
];

export default data;
