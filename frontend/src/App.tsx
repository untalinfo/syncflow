import { useState, useCallback, useEffect } from 'react';
import { useAppDependencies } from './presentation/DependencyProvider';
import type { SyncRequest } from './domain/IRequestNode';
import './App.css';

function App() {
  const { createRequest, getRequests, syncRequests } = useAppDependencies();
  const [requests, setRequests] = useState<SyncRequest[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [form, setForm] = useState({ name: '', payload: '', type: 'text-transform' });

  const loadData = useCallback(async () => {
    const data = await getRequests.execute();
    setRequests([...data].reverse());
  }, [getRequests]);

  useEffect(() => { loadData(); }, [loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.payload) return;
    await createRequest.execute(form.name, form.payload, form.type);
    setForm({ name: '', payload: '', type: 'text-transform' });
    await loadData();
  };

  const handleSync = async () => {
    setIsSyncing(true);
    const success = await syncRequests.execute();
    if (success) {
      alert("Sincronización exitosa");
    } else {
      alert("Error al sincronizar. Revisa la consola o asegúrate que .NET está corriendo.");
    }
    await loadData();
    setIsSyncing(false);
  };

  const pendingCount = requests.filter(r => r.status === 'Pending').length;

  return (
    <div className="app-container">
      <header className="header glass">
        <div className="logo">
          <div className="circle"></div> Syncflow
        </div>
        <button className={`btn-sync ${isSyncing ? 'syncing' : ''}`} onClick={handleSync} disabled={isSyncing || pendingCount === 0}>
          {isSyncing ? 'Sincronizando...' : `Sincronizar Todo (${pendingCount} pendientes)`}
        </button>
      </header>

      <main className="main-content">
        <section className="form-section glass">
          <h2>Nueva Solicitud Offline</h2>
          <form onSubmit={handleSubmit} className="sync-form">
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Ej. Actualización de datos" />
            </div>
            <div className="form-group">
              <label>Estrategia / Tipo</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="text-transform">Transformar Texto (Mayúsculas)</option>
                <option value="structure-modify">Modificar Estructura (Envolder en JSON)</option>
                <option value="raw">Crudo (Sin procesar)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Payload</label>
              <textarea value={form.payload} onChange={e => setForm({...form, payload: e.target.value})} placeholder="Contenido o datos..."></textarea>
            </div>
            <button type="submit" className="btn-submit">Guardar Localmente</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Lista de Solicitudes ({requests.length})</h2>
          <div className="requests-grid">
            {requests.length === 0 && <p className="empty-state">No hay solicitudes locales. ¡Crea una!</p>}
            {requests.map(req => (
              <div key={req.id} className={`request-card glass ${req.status.toLowerCase()}`}>
                <div className="card-header">
                  <h3>{req.name}</h3>
                  <span className={`badge ${req.status.toLowerCase()}`}>{req.status}</span>
                </div>
                <div className="card-body">
                  <p className="type-meta">Type: <code>{req.type}</code></p>
                  <p className="payload">{req.payload}</p>
                </div>
                <div className="card-footer">
                  <small>{new Date(req.createdAt).toLocaleString()}</small>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
