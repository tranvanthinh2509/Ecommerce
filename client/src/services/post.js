import axios from "axios";

export const createPost = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/post/createPost`,
    data
  );
  return res?.data;
};

export const getLimitPost = async (
  code,
  page,
  filter,
  priceCode = null,
  areaCode = null
) => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getLimitPost?categoryCode=${code}&page=${page}&filter=${filter}&priceCode=${priceCode}&areaCode=${areaCode}`
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

export const getNewPost = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getNewPost`
  );
  return res.data;
};

export const uploadImageToCloud = async (data) => {
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
    data
  );
  return res;
};

export const getLimitAdmin = async (code, page, filter) => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getLimitAdmin?categoryCode=${code}&page=${page}&filter=${filter}`
  );
  return res.data;
};
