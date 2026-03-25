import type { SyncRequest } from './IRequestNode';

export interface ILocalRequestRepository {
  save(request: SyncRequest): Promise<void>;
  getAll(): Promise<SyncRequest[]>;
  update(request: SyncRequest): Promise<void>;
  getPending(): Promise<SyncRequest[]>;
}

export interface IRemoteRequestRepository {
  sync(requests: SyncRequest[]): Promise<boolean>;
}
