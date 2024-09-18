import axios from "axios";

export const getAllCategory = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/navigate/getAll`
  );
  return res.data;
};
