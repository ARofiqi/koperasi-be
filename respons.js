const response = (statusCode, data, message, res) => {
  res.status(statusCode).json({
    data,
    message,
  });
};
module.exports = response;

// const config = require("./src/config/config");

// const response = (statusCode, data, message, res, page, totalPages, route) => {
//   const startIndex = (page - 1) * config.itemPerPage;
//   const endIndex = startIndex + parseInt(config.itemPerPage);
//   const paginatedData = data.slice(startIndex, endIndex);

//   const responseData = {
//     payload: {
//       data: paginatedData,
//       message,
//     },
//     metadata: {
//       prev: page > 1 ? `${route}?page=${page - 1}` : null,
//       next: page < totalPages ? `${route}?page=${page + 1}` : null,
//       current: `${route}?page=${page}`,
//     },
//   };

//   res.status(statusCode).json([responseData]);
// };

// module.exports = response;
