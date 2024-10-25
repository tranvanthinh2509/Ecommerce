import axios from "axios";
import { axiosJWT } from "./auth";

export const createPost = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_SERVER_URL}/api/post/createPost`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res?.data;
};

export const updatePost = async (data, access_token) => {
  const res = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/api/post/updatePost`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
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

export const getLimitAdmin = async (
  code,
  page,
  filter,
  access_token,
  userId
) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getLimitAdmin?categoryCode=${code}&page=${page}&filter=${filter}&userId=${userId}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deletePost = async (postId, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_SERVER_URL}/api/post/deletePost?postId=${postId}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getDetailPost = async (pid) => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getDetailPost?pid=${pid}`
  );
  return res.data;
};
