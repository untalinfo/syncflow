import type { ElementType } from "react";
import { Suspense } from "react";

import LoaderHorizontal from "./LoaderHorizontal";

const Loadable =
	<P extends object>(Component: ElementType) =>
	(props: P) => (
		<Suspense fallback={<LoaderHorizontal />}>
			<Component {...props} />
		</Suspense>
	);

export default Loadable;
