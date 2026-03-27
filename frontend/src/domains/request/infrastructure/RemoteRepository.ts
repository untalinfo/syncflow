import type { SyncRequest } from "../../../shared/application/types/IRequestNode";
import type { IRemoteRequestRepository } from "../application/types/IRepository";

export class RemoteRepository implements IRemoteRequestRepository {
	private readonly baseUrl = "http://localhost:5050/api";

	public async sync(requests: SyncRequest[]): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/sync`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(requests),
			});
			return response.ok;
		} catch (error) {
			console.error("Error sincronizando falló:", error);
			return false;
		}
	}

	public async deleteById(id: string): Promise<boolean> {
		try {
			const response = await fetch(`${this.baseUrl}/requests/${id}`, {
				method: "DELETE",
			});
			return response.ok;
		} catch (error) {
			console.error("Error eliminando request en remoto:", error);
			return false;
		}
	}
}
