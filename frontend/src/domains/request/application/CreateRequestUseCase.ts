import type { ILocalRequestRepository } from '../../../domain/IRepository';
import type { SyncRequest } from '../../../domain/IRequestNode';
import { RequestItem } from '../../../domain/RequestItem';

export class CreateRequestUseCase {
  private localRepo: ILocalRequestRepository;

  constructor(localRepo: ILocalRequestRepository) {
    this.localRepo = localRepo;
  }

  public async execute(name: string, payload: string, type: string): Promise<SyncRequest> {
    const newItem = new RequestItem(
      crypto.randomUUID(),
      name,
      payload,
      type
    );
    await this.localRepo.save(newItem);
    return newItem;
  }
}
