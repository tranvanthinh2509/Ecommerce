import axios from "axios";

export const getLimitPost = async (code) => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getLimitPost?categoryCode=${code}`
  );
  return res.data;
};

export const getAllPost = async (code) => {
  console.log("code ", code);
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/post/getAllPost`
  );
  return res.data;
};
