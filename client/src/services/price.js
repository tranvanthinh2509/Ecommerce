import axios from "axios";
export const getAllPrice = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/price/getAllPrice`
  );
  return res.data;
};
