export const convertStringtoDate = (dateStr) => {
  const [day, month, year] = dateStr?.split("/");
  // Tạo chuỗi ngày mới theo định dạng YYYY-MM-DD
  const newDateStr = `${year}-${month}-${day}`;

  return newDateStr;
};
