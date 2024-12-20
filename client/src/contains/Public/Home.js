import { useEffect } from "react";
import { path } from "../../ultils/constant";
import Search from "./Search";
import Support from "./Support";
import Whyus from "./Whyus";
import { Header, Navigation } from "./index";
import { Outlet, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();

  // useEffect(() => {
  //   if (location.path === "/") {
  //     window.location.reload();
  //   }
  // }, [location.path]);

  return (
    <div className="w-full flex flex-col items-center h-full ">
      <Header />
      <Navigation />
      {location.pathname !== "/login" &&
        !location?.pathname?.includes(path.DETAIL_ALL) && <Search />}
      <div className="w-1100 flex flex-col items-center mt-3 ">
        <Outlet />
      </div>
      <Whyus />
      <Support />
    </div>
  );
}

export default Home;
