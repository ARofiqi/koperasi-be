// const response = (statusCode, data, message, res) => {
//   res.status(statusCode).json([
//     {
//       payload: {
//         data,
//         message,
//       },
//       metadata: {
//         prev: "",
//         next: "",
//         current: "",
//       },
//     },
//   ]);
// };

const config = require("./src/config/config");

// module.exports = response;

// response.js
const response = (statusCode, data, message, res, page, totalPages, route) => {
  const startIndex = (page - 1) * config.itemPerPage; //0 - 5, 5 - 10
  const endIndex = startIndex + config.itemPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  console.log(startIndex);
  console.log(endIndex);
  console.log(paginatedData.length);

  const responseData = {
    payload: {
      data: paginatedData,
      message,
    },
    metadata: {
      prev: page > 1 ? `${route}?page=${page - 1}` : null,
      next: page < totalPages ? `${route}?page=${page + 1}` : null,
      current: `${route}?page=${page}`,
    },
  };

  res.status(statusCode).json([responseData]);
};

module.exports = response;
