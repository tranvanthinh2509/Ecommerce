import axios from "axios";

export const getProvince = async () => {
  const res = await axios.get(`https://vapi.vnappmob.com/api/province`);
  return res.data.results;
};

export const getDictrict = async (id) => {
  const res = await axios.get(
    `https://vapi.vnappmob.com/api/province/district/${id}`
  );
  return res.data.results;
};
