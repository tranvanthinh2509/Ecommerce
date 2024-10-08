import axios from "axios";

export const getLimitPost = async (code, page) => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getLimitPost?categoryCode=${code}&page=${page}`
  );
  return res.data;
};

export const getAllPost = async (
  code,
  page,
  filter,
  priceCode = null,
  areaCode = null
) => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getAllPost?page=${page}&filter=${filter}&priceCode=${priceCode}&areaCode=${areaCode}`
  );
  return res.data;
};
