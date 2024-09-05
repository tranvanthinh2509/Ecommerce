import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "post",
        url: "/api/user/sign-up",
        data: payload,
      });
    } catch (error) {
      reject(error);
    }
  });
