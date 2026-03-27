import type {
	Status,
	SyncRequest,
} from "../../../shared/application/types/IRequestNode";

/**
 * Patrón Composite: Representa una Solicitud Individual (Hoja/Leaf)
 */
export class RequestItem implements SyncRequest {
	public id: string;
	public name: string;
	public payload: string;
	public status: Status;
	public type: string;
	public createdAt: string;

	constructor(id: string, name: string, payload: string, type: string) {
		this.id = id;
		this.name = name;
		this.payload = payload;
		this.type = type;
		this.status = "Pending";
		this.createdAt = new Date().toISOString();
	}

	public count(): number {
		return 1;
	}

	public flatten(): SyncRequest[] {
		return [this];
	}
}
