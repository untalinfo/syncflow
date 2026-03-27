import type {
	ILocalRequestRepository,
	IRemoteRequestRepository,
} from "./types/IRepository";

export class DeleteRequestUseCase {
	private localRepo: ILocalRequestRepository;
	private remoteRepo: IRemoteRequestRepository;

	constructor(
		localRepo: ILocalRequestRepository,
		remoteRepo: IRemoteRequestRepository,
	) {
		this.localRepo = localRepo;
		this.remoteRepo = remoteRepo;
	}

	/**
	 * Deletes a request locally (always) and remotely when online.
	 * Works offline-first: the local deletion always succeeds.
	 * Remote deletion is attempted as a best-effort; failures are swallowed
	 * since the item was already removed locally.
	 */
	public async execute(id: string): Promise<void> {
		// Always delete locally — works offline
		await this.localRepo.delete(id);

		// Best-effort remote deletion (ignored when offline)
		try {
			await this.remoteRepo.deleteById(id);
		} catch {
			// Silent — offline or network error; local is the source of truth
		}
	}
}
