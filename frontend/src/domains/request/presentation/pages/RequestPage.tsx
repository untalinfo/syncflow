import { useState, useCallback, useEffect } from "react";
import { RiGitPrDraftLine } from "@remixicon/react";
import { useRequestDependencies } from "../DependencyProvider";
import type { SyncRequest } from "../../../../domain/IRequestNode";
import "./RequestPage.scss";

export const RequestPage: React.FC = () => {
  const { getRequests, syncRequests } = useRequestDependencies();
  const [requests, setRequests] = useState<SyncRequest[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

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

  const pendingCount = requests.filter((r) => r.status === "Pending").length;

  return (
    <div className="request-page-container">
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
              >
                <div className="card-header">
                  <h3>
                    <span
                      className={`sync-dot ${req.status.toLowerCase()}`}
                    ></span>
                    {req.name}
                  </h3>
                  <span className={`badge ${req.status.toLowerCase()}`}>
                    {req.status}
                  </span>
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
