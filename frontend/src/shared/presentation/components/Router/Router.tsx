import { createBrowserRouter } from "react-router-dom";
import Loadable from "../Loadable";
import { lazy } from "react";
import ErrorPage from "../ErrorPage/ErrorPage";

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
    element: <HomePage />,
    errorElement: <ErrorPage errorCode="500" />,
  },
  {
    path: "/request",
    element: <RequestPage />,
    errorElement: <ErrorPage errorCode="500" />,
  },
]);

export default router;
