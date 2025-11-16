import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "../utils/routes";

const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
  },
});

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
