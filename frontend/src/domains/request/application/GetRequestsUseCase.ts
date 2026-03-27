import type { SyncRequest } from "../../../shared/application/types/IRequestNode";
import type { ILocalRequestRepository } from "./types/IRepository";

export class GetRequestsUseCase {
	private localRepo: ILocalRequestRepository;

	constructor(localRepo: ILocalRequestRepository) {
		this.localRepo = localRepo;
	}

	public async execute(): Promise<SyncRequest[]> {
		return this.localRepo.getAll();
	}
}
