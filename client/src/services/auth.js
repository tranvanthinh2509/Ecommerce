import axios from "axios";

export const axiosJWT = axios.create();

export const apiRegister = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/user/sign-up`,
    data
  );
  return res.data;
};

export const apiLogin = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/user/sign-in`,
    data
  );
  return res.data;
};

export const getDetailUser = async (id, access_token) => {
  const res = await axiosJWT.get(
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

export const logOutUser = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_SERVER_URL}/api/user/log-out`
  );
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/api/user/updateUser?id=${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
