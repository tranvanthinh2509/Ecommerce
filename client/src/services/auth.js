import axiosConfig from "../axiosConfig";

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
