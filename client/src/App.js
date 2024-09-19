import { Routes, Route } from "react-router-dom";
import { Home, Login, Rental } from "./contains/Public";
import { path } from "./ultils/constant";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import * as UserService from "./services/auth";
import { updateUser } from "./redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { isJsonString } from "./ultils/func";

function App() {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();

    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);

  const handleGetDetailUser = async (id, token) => {
    try {
      const res = await UserService.getDetailUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
    } catch {
      localStorage.removeItem("access_token");
    }
  };

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");

    let decoded;
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async function (config) {
      const currentTime = new Date();
      const { storageData, decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserService.refreshToken();

        // localStorage.setItem('access_token', JSON.stringify(data?.access_token));
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        {/* <Route path={path.Home} element={<Home />}></Route>
        <Route path={path.Login} element={<Login />} /> */}
        <Route path={path.Home} element={<Home />}>
          <Route path={path.Login} element={<Login />} />
          <Route path={path.CTCH} element={<Rental />} />
          <Route path={path.CTPT} element={<Rental />} />
          <Route path={path.CTMB} element={<Rental />} />
          <Route path={path.NCT} element={<Rental />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
