import type { ILocalRequestRepository } from '../../../domain/IRepository';
import type { SyncRequest } from '../../../domain/IRequestNode';

const STORAGE_KEY = 'syncflow_requests';

export class LocalStorageRepository implements ILocalRequestRepository {
  private getStorage(): SyncRequest[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  private setStorage(data: SyncRequest[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  public async save(request: SyncRequest): Promise<void> {
    const items = this.getStorage();
    items.push(request);
    this.setStorage(items);
  }

  public async getAll(): Promise<SyncRequest[]> {
    return this.getStorage();
  }

  public async update(request: SyncRequest): Promise<void> {
    const items = this.getStorage();
    const index = items.findIndex(r => r.id === request.id);
    if (index !== -1) {
      items[index] = request;
      this.setStorage(items);
    }
  }

  public async getPending(): Promise<SyncRequest[]> {
    return this.getStorage().filter(r => r.status === 'Pending');
  }

  public async delete(id: string): Promise<void> {
    const items = this.getStorage().filter(r => r.id !== id);
    this.setStorage(items);
  }
}
