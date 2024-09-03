import { Routes, Route } from "react-router-dom";
import { Home, Login } from "./contains/Public";
import { path } from "./ultils/constant";

function App() {
  return (
    <div className="h-screen w-screen bg-primary">
      <Routes>
        {/* <Route path={path.Home} element={<Home />}></Route>
        <Route path={path.Login} element={<Login />} /> */}
        <Route path={path.Home} element={<Home />}>
          <Route path={path.Login} element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
