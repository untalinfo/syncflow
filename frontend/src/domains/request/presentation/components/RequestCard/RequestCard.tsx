import React from "react";
import { RiDeleteBin6Line } from "@remixicon/react";
import type { SyncRequest } from "../../../../../shared/application/types/IRequestNode";
import "./RequestCard.scss";

interface RequestCardProps {
  request: SyncRequest;
  onCardClick: (req: SyncRequest) => void;
  onDeleteClick: (req: SyncRequest) => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({ request, onCardClick, onDeleteClick }) => {
  return (
    <div
      className={`request-card ${request.status.toLowerCase()}`}
      style={{ cursor: "pointer" }}
      onClick={() => onCardClick(request)}
    >
      <div className="card-header">
        <h3>
          <span className={`sync-dot ${request.status.toLowerCase()}`}></span>
          {request.name}
        </h3>
        <div className="card-header-actions">
          <span className={`badge ${request.status.toLowerCase()}`}>
            {request.status}
          </span>
          <button
            id={`delete-btn-${request.id}`}
            className="btn-delete"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteClick(request);
            }}
            title="Delete request"
            aria-label={`Delete ${request.name}`}
          >
            <RiDeleteBin6Line size={15} />
          </button>
        </div>
      </div>
      <div className="card-body">
        <p className="type-meta">
          <code>{request.type}</code>
        </p>
        <p className="payload">{request.payload}</p>
      </div>
      <div className="card-footer">
        {new Date(request.createdAt).toLocaleString()}
      </div>
    </div>
  );
};
