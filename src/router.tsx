
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Reporter from "./pages/Reporter";
import MaintenanceTech from "./pages/MaintenanceTech";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <NotFound />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/reporter",
    element: <Reporter />,
  },
  {
    path: "/maintenance-tech",
    element: <MaintenanceTech />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
