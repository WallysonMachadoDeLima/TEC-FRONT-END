import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./Error.jsx";
import GuardRoute from "./Guard.jsx";
import Home from "../pages/home/index.jsx";
import Login from "../pages/login/index.jsx";
import Register from "../pages/register/index.jsx";
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro/" element={<Register />} />
        <Route
          path="/home/"
          element={
            <GuardRoute>
              <Home />
            </GuardRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
