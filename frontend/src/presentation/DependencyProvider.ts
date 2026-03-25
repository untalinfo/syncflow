import { createContext, useContext } from 'react';
import { LocalStorageRepository } from '../infrastructure/LocalStorageRepository';
import { RemoteRepository } from '../infrastructure/RemoteRepository';
import { PayloadProcessor, TextTransformStrategy, StructureModifyStrategy } from '../infrastructure/Strategies';
import { CreateRequestUseCase } from '../application/CreateRequestUseCase';
import { GetRequestsUseCase } from '../application/GetRequestsUseCase';
import { SyncRequestsUseCase } from '../application/SyncRequestsUseCase';

const localRepo = new LocalStorageRepository();
const remoteRepo = new RemoteRepository();
const processor = new PayloadProcessor([
  new TextTransformStrategy(),
  new StructureModifyStrategy()
]);

const createReqUC = new CreateRequestUseCase(localRepo);
const getReqUC = new GetRequestsUseCase(localRepo);
const syncUC = new SyncRequestsUseCase(localRepo, remoteRepo, processor);

interface IDependencies {
  createRequest: CreateRequestUseCase;
  getRequests: GetRequestsUseCase;
  syncRequests: SyncRequestsUseCase;
}

const DependencyContext = createContext<IDependencies>({
  createRequest: createReqUC,
  getRequests: getReqUC,
  syncRequests: syncUC
});

export const useAppDependencies = () => useContext(DependencyContext);
