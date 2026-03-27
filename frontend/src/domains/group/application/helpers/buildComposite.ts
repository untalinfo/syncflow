import type { SyncRequest } from "../../../../shared/application/types/IRequestNode";
import { RequestItem } from "../../../request/domain/RequestItem";
import { RequestGroup } from "../../domain/RequestGroup";
import type { StoredGroup } from "../types/IGroup";

/**
 * Builds a RequestGroup composite tree from stored flat data.
 * Recursively attaches child groups and leaf RequestItems.
 */
export function buildComposite(
	stored: StoredGroup,
	allGroups: StoredGroup[],
	allRequests: SyncRequest[],
): RequestGroup {
	const group = new RequestGroup(stored.id, stored.name);

	// Add leaf nodes (RequestItem)
	stored.requestIds.forEach((rid: string) => {
		const req = allRequests.find((r) => r.id === rid);
		if (req) {
			const item = new RequestItem(req.id, req.name, req.payload, req.type);
			item.status = req.status;
			(item as any).createdAt = req.createdAt;
			group.add(item);
		}
	});

	// Recursively add composite child groups
	stored.childGroupIds.forEach((cgId: string) => {
		const childStored = allGroups.find((g) => g.id === cgId);
		if (childStored) {
			group.add(buildComposite(childStored, allGroups, allRequests));
		}
	});

	return group;
}
