import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { path } from "../../ultils/constant";
import SideBar from "./SideBar";
function System() {
  //   const user1 = useSelector((state) => state?.user?.currentUser);

  //   console.log(!user1);
  //   useEffect(() => {
  //     if (user1 === null) {
  //       return <Navigate to={path.Login} replace={true} />;
  //     }
  //   }, [user1]);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="w-full flex flex-auto">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default System;
