import { useState, useCallback, useEffect } from "react";
import { RiGitPrDraftLine, RiDeleteBin6Line, RiAlertLine } from "@remixicon/react";
import { useRequestDependencies } from "../DependencyProvider";
import type { SyncRequest } from "../../../../domain/IRequestNode";
import { Modal } from "../../../../shared/presentation/components/Modal/Modal";
import { RequestDetailModal } from "../components/RequestDetailModal/RequestDetailModal";
import "./RequestPage.scss";

interface DeleteModalProps {
  request: SyncRequest;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ request, onConfirm, onCancel, isDeleting }) => (
  <Modal onClose={onCancel} disableBackdropClose={isDeleting}>
    <div className="delete-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-icon-wrapper">
        <RiAlertLine size={28} />
      </div>
      <h3 id="modal-title">Delete Request</h3>
      <p className="modal-description">
        Are you sure you want to delete <strong>"{request.name}"</strong>?
        This action cannot be undone.
      </p>
      <div className="modal-actions">
        <button
          id="modal-cancel-btn"
          className="btn-cancel"
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancel
        </button>
        <button
          id="modal-confirm-btn"
          className="btn-delete-confirm"
          onClick={onConfirm}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting…" : "Yes, Delete"}
        </button>
      </div>
    </div>
  </Modal>
);

export const RequestPage: React.FC = () => {
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

    window.addEventListener("request-created", handleRequestCreated);
    return () => {
      window.removeEventListener("request-created", handleRequestCreated);
    };
  }, [loadData]);

  const handleSync = useCallback(async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    const success = await syncRequests.execute();
    window.dispatchEvent(new CustomEvent('sync-result', { detail: { success } }));
    window.dispatchEvent(new CustomEvent('sync-completed'));
    await loadData();
    setIsSyncing(false);
  }, [isSyncing, syncRequests, loadData]);

  useEffect(() => {
    const handleSyncEvent = () => handleSync();
    window.addEventListener('sync-requests', handleSyncEvent);
    return () => window.removeEventListener('sync-requests', handleSyncEvent);
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

  return (
    <div className="request-page-container">
      {pendingDelete && (
        <DeleteModal
          request={pendingDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          isDeleting={isDeleting}
        />
      )}
      {pendingDetail && (
        <RequestDetailModal
          request={pendingDetail}
          onClose={() => setPendingDetail(null)}
        />
      )}

      <header className="request-page-header">
        <div className="title-group">
          <h2>Request Thread</h2>
          <p>Manage and synchronize your data requests across environments.</p>
        </div>
        <button
          className="btn-sync"
          onClick={handleSync}
          disabled={isSyncing || pendingCount === 0}
        >
          {isSyncing ? (
            <><RiGitPrDraftLine size={16} className="spin" /> Syncing...</>
          ) : `Sync All (${pendingCount})`}
        </button>

      </header>

      <main className="request-page-main">
        <section className="list-section">
          <div className="requests-grid">
            {requests.length === 0 && (
              <div className="empty-state">
                <RiGitPrDraftLine size={48} />
                <p>
                  No requests yet. Create your first request to get started.
                </p>
              </div>
            )}
            {requests.map((req, index) => (
              <div
                key={req.id || index}
                className={`request-card ${req.status.toLowerCase()}`}
                style={{ cursor: "pointer" }}
                onClick={() => handleCardClick(req)}
              >
                <div className="card-header">
                  <h3>
                    <span
                      className={`sync-dot ${req.status.toLowerCase()}`}
                    ></span>
                    {req.name}
                  </h3>
                  <div className="card-header-actions">
                    <span className={`badge ${req.status.toLowerCase()}`}>
                      {req.status}
                    </span>
                    <button
                      id={`delete-btn-${req.id}`}
                      className="btn-delete"
                      onClick={(e) => { e.stopPropagation(); handleDeleteClick(req); }}
                      title="Delete request"
                      aria-label={`Delete ${req.name}`}
                    >
                      <RiDeleteBin6Line size={15} />
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <p className="type-meta">
                    <code>{req.type}</code>
                  </p>
                  <p className="payload">{req.payload}</p>
                </div>
                <div className="card-footer">
                  {new Date(req.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
