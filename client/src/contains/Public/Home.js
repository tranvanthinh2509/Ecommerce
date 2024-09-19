import { Header, Navigation } from "./index";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="w-full flex flex-col items-center h-full ">
      <Header />
      <Navigation />
      <div className="w-1100 flex flex-col items-center mt-3">
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
