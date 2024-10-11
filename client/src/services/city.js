import axios from "axios";
export const getAllCity = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/city/getAllCity`
  );
  return res.data;
};
