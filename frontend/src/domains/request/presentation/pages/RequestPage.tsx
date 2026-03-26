import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRequestDependencies } from "../DependencyProvider";
import type { SyncRequest } from "../../../../domain/IRequestNode";

export const RequestPage: React.FC = () => {
  const navigate = useNavigate();
  const { createRequest, getRequests, syncRequests } = useRequestDependencies();
  const [requests, setRequests] = useState<SyncRequest[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [form, setForm] = useState({
    name: "",
    payload: "",
    type: "text-transform",
  });

  const loadData = useCallback(async () => {
    const data = await getRequests.execute();
    setRequests([...data].reverse());
  }, [getRequests]);

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, [loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.payload) return;
    await createRequest.execute(form.name, form.payload, form.type);
    setForm({ name: "", payload: "", type: "text-transform" });
    await loadData();
  };

  const handleSync = async () => {
    setIsSyncing(true);
    const success = await syncRequests.execute();
    if (success) {
      alert("Sincronización exitosa");
    } else {
      alert(
        "Error al sincronizar. Revisa la consola o asegúrate que .NET está corriendo.",
      );
    }
    await loadData();
    setIsSyncing(false);
  };

  const pendingCount = requests.filter((r) => r.status === "Pending").length;

  return (
    <div className="app-container">
      <header className="header">
        <button className="btn-back" onClick={() => navigate("/")}>
          🔙 Volver al Home
        </button>
        <div className="logo">Syncflow</div>
        <button
          className="btn-sync"
          onClick={handleSync}
          disabled={isSyncing || pendingCount === 0}
        >
          {isSyncing ? "Sincronizando..." : `Sync All (${pendingCount})`}
        </button>
      </header>
      <main className="main-content">
        <section className="form-section">
          <h2>Nueva Solicitud Offline</h2>
          <form onSubmit={handleSubmit} className="sync-form">
            <div className="form-group">
              <label>Request Title</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Update Client Data"
              />
            </div>
            <div className="form-group">
              <label>Strategy / Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="text-transform">
                  Transform Text (Uppercase)
                </option>
                <option value="structure-modify">
                  Modify Structure (JSON wrap)
                </option>
                <option value="raw">Raw (Unprocessed)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Payload</label>
              <textarea
                value={form.payload}
                onChange={(e) => setForm({ ...form, payload: e.target.value })}
                placeholder="Content or data..."
              ></textarea>
            </div>
            <button type="submit" className="btn-submit">
              Save Local Request
            </button>
          </form>
        </section>
        <section className="list-section">
          <h2>Request Thread</h2>
          <div className="requests-grid">
            {requests.length === 0 && (
              <p className="empty-state">No requests yet.</p>
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
