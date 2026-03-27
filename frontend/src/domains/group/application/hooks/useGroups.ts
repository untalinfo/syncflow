import { useCallback, useEffect, useState } from "react";
import type { SyncRequest } from "../../../../shared/application/types/IRequestNode";
import { LocalStorageRepository } from "../../../request/infrastructure/LocalStorageRepository";
import type { RequestGroup } from "../../domain/RequestGroup";
import { LocalGroupRepository } from "../../infrastructure/LocalGroupRepository";
import { buildComposite } from "../helpers/buildComposite";
import type { StoredGroup } from "../types/IGroup";

const groupRepo = new LocalGroupRepository();
const requestRepo = new LocalStorageRepository();

export interface UseGroupsReturn {
	storedGroups: StoredGroup[];
	composites: RequestGroup[];
	allRequests: SyncRequest[];
	newGroupName: string;
	isCreating: boolean;
	setNewGroupName: (name: string) => void;
	handleCreateGroup: (e: React.FormEvent) => void;
	handleDelete: (groupId: string) => void;
	handleAddRequest: (groupId: string, requestId: string) => void;
	handleRemoveRequest: (groupId: string, requestId: string) => void;
}

export function useGroups(): UseGroupsReturn {
	const [storedGroups, setStoredGroups] = useState<StoredGroup[]>([]);
	const [allRequests, setAllRequests] = useState<SyncRequest[]>([]);
	const [newGroupName, setNewGroupName] = useState("");
	const [isCreating, setIsCreating] = useState(false);

	const reload = useCallback(async () => {
		setStoredGroups(groupRepo.getAll());
		setAllRequests(await requestRepo.getAll());
	}, []);

	useEffect(() => {
		reload();
		window.addEventListener("request-created", reload);
		window.addEventListener("sync-completed", reload);
		return () => {
			window.removeEventListener("request-created", reload);
			window.removeEventListener("sync-completed", reload);
		};
	}, [reload]);

	const handleCreateGroup = (e: React.FormEvent) => {
		e.preventDefault();
		const trimmed = newGroupName.trim();
		if (!trimmed) return;
		setIsCreating(true);
		groupRepo.create(trimmed);
		setNewGroupName("");
		setIsCreating(false);
		reload();
	};

	const handleDelete = (groupId: string) => {
		groupRepo.delete(groupId);
		reload();
	};

	const handleAddRequest = (groupId: string, requestId: string) => {
		groupRepo.addRequest(groupId, requestId);
		reload();
	};

	const handleRemoveRequest = (groupId: string, requestId: string) => {
		groupRepo.removeRequest(groupId, requestId);
		reload();
	};

	const composites = storedGroups.map((sg) =>
		buildComposite(sg, storedGroups, allRequests),
	);

	return {
		storedGroups,
		composites,
		allRequests,
		newGroupName,
		isCreating,
		setNewGroupName,
		handleCreateGroup,
		handleDelete,
		handleAddRequest,
		handleRemoveRequest,
	};
}
