import { createBrowserRouter } from "react-router-dom";
import Loadable from "../Loadable";
import { lazy } from "react";
import ErrorPage from "../ErrorPage/ErrorPage";
import LayoutApp from "../../Layouts/LayoutApp";

const HomePage = Loadable(
  lazy(() =>
    import("../../../../domains/home/presentation/pages/HomePage").then(
      (module) => ({ default: module.HomePage }),
    ),
  ),
);
const RequestPage = Loadable(
  lazy(() =>
    import("../../../../domains/request/presentation/pages/RequestPage").then(
      (module) => ({ default: module.RequestPage }),
    ),
  ),
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />,
    errorElement: <ErrorPage errorCode="500" />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/request",
        element: <RequestPage />,
      },
    ],
  },
]);

export default router;
