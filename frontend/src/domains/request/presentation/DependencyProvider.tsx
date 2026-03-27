import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { CreateRequestUseCase } from "../application/CreateRequestUseCase";
import { DeleteRequestUseCase } from "../application/DeleteRequestUseCase";
import { GetRequestsUseCase } from "../application/GetRequestsUseCase";
import { SyncRequestsUseCase } from "../application/SyncRequestsUseCase";
import { LocalStorageRepository } from "../infrastructure/LocalStorageRepository";
import { RemoteRepository } from "../infrastructure/RemoteRepository";
import {
	PayloadProcessor,
	StructureModifyStrategy,
	TextTransformStrategy,
} from "../infrastructure/Strategies";

interface IDependencies {
	createRequest: CreateRequestUseCase;
	getRequests: GetRequestsUseCase;
	syncRequests: SyncRequestsUseCase;
	deleteRequest: DeleteRequestUseCase;
}

const localRepo = new LocalStorageRepository();
const remoteRepo = new RemoteRepository();
const processor = new PayloadProcessor([
	new TextTransformStrategy(),
	new StructureModifyStrategy(),
]);

const createReqUC = new CreateRequestUseCase(localRepo);
const getReqUC = new GetRequestsUseCase(localRepo);
const syncUC = new SyncRequestsUseCase(localRepo, remoteRepo, processor);
const deleteReqUC = new DeleteRequestUseCase(localRepo, remoteRepo);

const RequestContext = createContext<IDependencies | null>(null);

export const RequestProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<RequestContext.Provider
			value={{
				createRequest: createReqUC,
				getRequests: getReqUC,
				syncRequests: syncUC,
				deleteRequest: deleteReqUC,
			}}
		>
			{children}
		</RequestContext.Provider>
	);
};

export const useRequestDependencies = () => {
	const context = useContext(RequestContext);
	if (!context) {
		throw new Error(
			"useRequestDependencies must be used within a RequestProvider",
		);
	}
	return context;
};
