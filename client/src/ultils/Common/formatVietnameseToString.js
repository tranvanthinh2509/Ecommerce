export const formatVietnameseToString = (keyword) => {
  return keyword
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};

export const formatPriceToString = (number) => {
  let exchange = +number / 1000000;

  if (exchange < 1) return exchange + " đồng/tháng";
  else return exchange + " triệu/tháng";
};
