/**
 * Stored shape of a group in localStorage.
 * Contains only IDs; the full SyncRequest objects live in their own key.
 */
export interface StoredGroup {
  id: string;
  name: string;
  /** IDs of direct-child SyncRequests */
  requestIds: string[];
  /** IDs of direct-child sub-groups (supports nesting) */
  childGroupIds: string[];
  createdAt: string;
}
