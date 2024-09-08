import axiosConfig from "../axiosConfig";
import axios from "axios";

export const axiosJWT = axios.create();

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/user/sign-up",
        data: payload,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const apiLogin = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/user/sign-in",
        data: payload,
      });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });

export const getDetailUser = async (id, access_token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/user/detail-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

// export const apiLogin = async (data) => {
//   const res = await axios.post(
//     `${process.env.REACT_APP_SERVER_URL}/api/user/sign-in`,
//     data
//   );
//   return res.data;
// };
