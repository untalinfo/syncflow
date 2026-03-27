import React from "react";
import { RiAlertLine } from "@remixicon/react";
import type { SyncRequest } from "../../../../../shared/application/types/IRequestNode";
import { Modal } from "../../../../../shared/presentation/components/Modal/Modal";
import "./DeleteModal.scss";

interface DeleteModalProps {
  request: SyncRequest;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({ request, onConfirm, onCancel, isDeleting }) => (
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
