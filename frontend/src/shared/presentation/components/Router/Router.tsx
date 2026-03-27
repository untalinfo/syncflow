import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LayoutApp from "../../Layouts/LayoutApp";
import ErrorPage from "../ErrorPage/ErrorPage";
import Loadable from "../Loadable";

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
const GroupsPage = Loadable(
	lazy(() =>
		import(
			"../../../../domains/group/presentation/pages/GroupsPage/GroupsPage"
		).then((module) => ({ default: module.GroupsPage })),
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
			{
				path: "/groups",
				element: <GroupsPage />,
			},
		],
	},
]);

export default router;
