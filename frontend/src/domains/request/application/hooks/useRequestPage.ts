import { useState, useCallback, useEffect } from "react";
import { useRequestDependencies } from "../../presentation/DependencyProvider";
import type { SyncRequest } from "../../../../shared/application/types/IRequestNode";
import { REQUEST_CREATED, SYNC_COMPLETED, SYNC_REQUESTS, SYNC_RESULT } from "../constants/request";

export const useRequestPage = () => {
  const { getRequests, syncRequests, deleteRequest } = useRequestDependencies();
  const [requests, setRequests] = useState<SyncRequest[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<SyncRequest | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pendingDetail, setPendingDetail] = useState<SyncRequest | null>(null);

  const loadData = useCallback(async () => {
    const data = await getRequests.execute();
    setRequests([...data].reverse());
  }, [getRequests]);

  useEffect(() => {
    (async () => {
      await loadData();
    })();

    const handleRequestCreated = () => {
      loadData();
    };

    window.addEventListener(REQUEST_CREATED, handleRequestCreated);
    return () => {
      window.removeEventListener(REQUEST_CREATED, handleRequestCreated);
    };
  }, [loadData]);

  const handleSync = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    const success = await syncRequests.execute();
    window.dispatchEvent(new CustomEvent(SYNC_RESULT, { detail: { success } }));
    window.dispatchEvent(new CustomEvent(SYNC_COMPLETED));
    await loadData();
    setIsSyncing(false);
  }, [isSyncing, syncRequests, loadData]);

  useEffect(() => {
    const handleSyncEvent = () => handleSync();
    window.addEventListener(SYNC_REQUESTS, handleSyncEvent);
    return () => window.removeEventListener(SYNC_REQUESTS, handleSyncEvent);
  }, [handleSync]);

  const handleDeleteClick = (req: SyncRequest) => {
    setPendingDelete(req);
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    setIsDeleting(true);
    await deleteRequest.execute(pendingDelete.id);
    await loadData();
    setIsDeleting(false);
    setPendingDelete(null);
  };

  const handleDeleteCancel = () => {
    if (!isDeleting) setPendingDelete(null);
  };

  const handleCardClick = (req: SyncRequest) => {
    setPendingDetail(req);
  };

  const pendingCount = requests.filter((r) => r.status === "Pending").length;

  return {
    requests,
    isSyncing,
    pendingDelete,
    isDeleting,
    pendingDetail,
    handleSync,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleCardClick,
    setPendingDetail,
    pendingCount,
  };
};
