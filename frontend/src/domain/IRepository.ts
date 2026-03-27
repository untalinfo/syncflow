import type { SyncRequest } from './IRequestNode';

export interface ILocalRequestRepository {
  save(request: SyncRequest): Promise<void>;
  getAll(): Promise<SyncRequest[]>;
  update(request: SyncRequest): Promise<void>;
  getPending(): Promise<SyncRequest[]>;
  delete(id: string): Promise<void>;
}

export interface IRemoteRequestRepository {
  sync(requests: SyncRequest[]): Promise<boolean>;
  deleteById(id: string): Promise<boolean>;
}
