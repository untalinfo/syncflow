import type { ILocalRequestRepository } from '../domain/IRepository';
import type { SyncRequest } from '../domain/IRequestNode';

export class GetRequestsUseCase {
  constructor(private localRepo: ILocalRequestRepository) {}

  public async execute(): Promise<SyncRequest[]> {
    return this.localRepo.getAll();
  }
}
