import type { ILocalRequestRepository } from './types/IRepository';
import type { SyncRequest } from '../../../shared/application/types/IRequestNode';

export class GetRequestsUseCase {
  private localRepo: ILocalRequestRepository;

  constructor(localRepo: ILocalRequestRepository) {
    this.localRepo = localRepo;
  }

  public async execute(): Promise<SyncRequest[]> {
    return this.localRepo.getAll();
  }
}
