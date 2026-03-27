import React, { useState } from "react";
import { RiCloseLine, RiSendPlaneLine } from "@remixicon/react";
import { useRequestDependencies } from "../../DependencyProvider";
import { Modal } from "../../../../../shared/presentation/components/Modal/Modal";
import "./CreateRequestModal.scss";

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const CreateRequestModal: React.FC<CreateRequestModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { createRequest } = useRequestDependencies();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    payload: "",
    type: "text-transform",
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.payload) return;
    
    setIsSubmitting(true);
    try {
      await createRequest.execute(form.name, form.payload, form.type);
      setForm({ name: "", payload: "", type: "text-transform" });
      if (onSuccess) onSuccess();
      onClose();
      // Emit event for other components to refresh
      window.dispatchEvent(new CustomEvent("request-created"));
    } catch (error) {
      console.error("Error creating request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal onClose={onClose} disableBackdropClose={isSubmitting}>
      <div className="modal-container">
        <aside className="modal-container__sidebar">
          <div className="brand">
            <div className="logo-icon">SF</div>
            <h2>SyncFlow</h2>
          </div>
          <p className="description">
            Configure your request parameters and payload here. Your data will be
            synced automatically to the server when connected.
          </p>
          <div className="status-tags">
            <div className="status-tag">
              <span className="dot"></span>
              <span>Ready to compile</span>
            </div>
            <div className="status-tag status-tag--blue">
              <span className="dot"></span>
              <span>Production (Atelier Admin)</span>
            </div>
          </div>
        </aside>

        <section className="modal-container__form-content">
          <button className="close-btn" onClick={onClose}>
            <RiCloseLine size={24} />
          </button>
          
          <header>
            <h1>Create New Request</h1>
            <p>Fill out the details below to create a new synchronization task.</p>
          </header>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Request Title</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., Update Client Data"
                required
              />
            </div>

            <div className="form-group">
              <label>Strategy / Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="text-transform">Transform Text (Uppercase)</option>
                <option value="structure-modify">Modify Structure (JSON wrap)</option>
                <option value="raw">Raw (Unprocessed)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Payload</label>
              <textarea
                value={form.payload}
                onChange={(e) => setForm({ ...form, payload: e.target.value })}
                placeholder="Content or data..."
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-cancel" onClick={onClose}>
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn-submit" 
                disabled={isSubmitting || !form.name || !form.payload}
              >
                {isSubmitting ? "Saving..." : (
                  <>
                    <RiSendPlaneLine size={18} />
                    Create Request
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>
    </Modal>
  );
};

export default CreateRequestModal;
