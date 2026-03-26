import type { ILocalRequestRepository } from '../../../domain/IRepository';
import type { SyncRequest } from '../../../domain/IRequestNode';

export class GetRequestsUseCase {
  private localRepo: ILocalRequestRepository;

  constructor(localRepo: ILocalRequestRepository) {
    this.localRepo = localRepo;
  }

  public async execute(): Promise<SyncRequest[]> {
    return this.localRepo.getAll();
  }
}
