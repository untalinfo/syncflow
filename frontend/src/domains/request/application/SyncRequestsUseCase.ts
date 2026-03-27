import type { ILocalRequestRepository, IRemoteRequestRepository } from './types/IRepository';
import type { PayloadProcessor } from '../infrastructure/Strategies';

export class SyncRequestsUseCase {
  private localRepo: ILocalRequestRepository;
  private remoteRepo: IRemoteRequestRepository;
  private processor: PayloadProcessor;

  constructor(
    localRepo: ILocalRequestRepository,
    remoteRepo: IRemoteRequestRepository,
    processor: PayloadProcessor
  ) {
    this.localRepo = localRepo;
    this.remoteRepo = remoteRepo;
    this.processor = processor;
  }

  public async execute(): Promise<boolean> {
    const pendingReqs = await this.localRepo.getPending();
    if (pendingReqs.length === 0) return true;

    // Apply specific strategies to modifying payload before syncing
    const processedReqs = pendingReqs.map(req => this.processor.process(req));

    // Send the processed versions to the dotnet backend
    const isSuccess = await this.remoteRepo.sync(processedReqs);

    if (isSuccess) {
      // Mark local requests as Processed
      for (const req of pendingReqs) {
        req.status = 'Processed';
        await this.localRepo.update(req);
      }
    }

    return isSuccess;
  }
}
