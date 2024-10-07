import axios from "axios";
export const getAllArea = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/area/getAllArea`
  );
  return res.data;
};
