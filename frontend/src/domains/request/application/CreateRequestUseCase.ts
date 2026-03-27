import type { SyncRequest } from "../../../shared/application/types/IRequestNode";
import { RequestItem } from "../domain/RequestItem";
import type { ILocalRequestRepository } from "./types/IRepository";

export class CreateRequestUseCase {
	private localRepo: ILocalRequestRepository;

	constructor(localRepo: ILocalRequestRepository) {
		this.localRepo = localRepo;
	}

	public async execute(
		name: string,
		payload: string,
		type: string,
	): Promise<SyncRequest> {
		const newItem = new RequestItem(crypto.randomUUID(), name, payload, type);
		await this.localRepo.save(newItem);
		return newItem;
	}
}
