const pagenate = (total = 0, page = 1, size = 10) => {
  return {
    totalItems: total,
    currentPage: page,
    numberOfPages: Math.ceil(total / size),
  };
};
module.exports = { pagenate };
