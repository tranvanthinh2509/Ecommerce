import { Header, Navigation } from "./index";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="w-full flex flex-col items-center h-full ">
      <Header />
      <Navigation />
      <div className="w-full flex flex-col items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
