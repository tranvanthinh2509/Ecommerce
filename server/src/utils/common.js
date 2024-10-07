const getNumberFromString = (string) => {
  return +string.match(/\d+/)[0];
};

module.exports = {
  getNumberFromString,
};
