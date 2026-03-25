import type { IRemoteRequestRepository } from '../domain/IRepository';
import type { SyncRequest } from '../domain/IRequestNode';

export class RemoteRepository implements IRemoteRequestRepository {
  private readonly baseUrl = 'http://localhost:5050/api';

  public async sync(requests: SyncRequest[]): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requests)
      });
      return response.ok;
    } catch (error) {
       console.error("Error sincronizando falló:", error);
       return false;
    }
  }
}
