import React, { useState } from "react";
import {
  RiAddLine,
  RiFolderOpenLine,
  RiFolderLine,
  RiDeleteBin6Line,
  RiGitPrDraftLine,
  RiArrowRightSLine,
  RiArrowDownSLine,
  RiInformationLine,
} from "@remixicon/react";
import type { StoredGroup } from "../../../application/types/IGroup";
import type { RequestGroup } from "../../../domain/RequestGroup";
import type { SyncRequest } from "../../../../../shared/application/types/IRequestNode";
import { RequestPickerModal } from "../RequestPickerModal/RequestPickerModal";
import "./GroupCard.scss";

interface GroupCardProps {
  storedGroup: StoredGroup;
  composite: RequestGroup;
  allRequests: SyncRequest[];
  onDelete: (id: string) => void;
  onAddRequest: (groupId: string, requestId: string) => void;
  onRemoveRequest: (groupId: string, requestId: string) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  storedGroup,
  composite,
  allRequests,
  onDelete,
  onAddRequest,
  onRemoveRequest,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [showPicker, setShowPicker] = useState(false);

  const totalCount = composite.count();   // ← Patrón Composite: recursivo
  const flatItems = composite.flatten();  // ← Patrón Composite: recursivo

  return (
    <div className={`group-card ${expanded ? "group-card--expanded" : ""}`}>
      {/* ── Header ── */}
      <div className="group-card__header">
        <button
          className="group-card__toggle"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Collapse group" : "Expand group"}
        >
          {expanded ? <RiArrowDownSLine size={18} /> : <RiArrowRightSLine size={18} />}
          {expanded
            ? <RiFolderOpenLine size={20} className="folder-icon folder-icon--open" />
            : <RiFolderLine size={20} className="folder-icon" />}
        </button>

        <div className="group-card__title-area">
          <h3 className="group-card__name">{composite.name}</h3>
          <span className="group-card__meta">
            <code className="composite-badge">
              composite.count() = <strong>{totalCount}</strong>
            </code>
          </span>
        </div>

        <div className="group-card__actions">
          <button
            className="group-card__btn group-card__btn--add"
            onClick={() => setShowPicker(true)}
            title="Add request to this group"
          >
            <RiAddLine size={15} /> Add Request
          </button>
          <button
            className="group-card__btn group-card__btn--delete"
            onClick={() => onDelete(storedGroup.id)}
            title="Delete group"
          >
            <RiDeleteBin6Line size={15} />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      {expanded && (
        <div className="group-card__body">
          {totalCount === 0 ? (
            <div className="group-card__empty">
              <RiGitPrDraftLine size={28} />
              <p>No requests yet. Click "Add Request" to start building this group.</p>
            </div>
          ) : (
            <ul className="group-card__items">
              {flatItems.map((item: SyncRequest) => (
                <li key={item.id} className="group-item">
                  <span className={`group-item__dot group-item__dot--${item.status.toLowerCase()}`} />
                  <div className="group-item__info">
                    <span className="group-item__name">{item.name}</span>
                    <code className="group-item__type">{item.type}</code>
                    <span className={`group-item__badge group-item__badge--${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </div>
                  <button
                    className="group-item__remove"
                    onClick={() => onRemoveRequest(storedGroup.id, item.id)}
                    title="Remove from group"
                    aria-label={`Remove ${item.name} from group`}
                  >
                    <RiDeleteBin6Line size={13} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Composite trace */}
          <div className="composite-trace">
            <RiInformationLine size={13} />
            <span>
              <code>RequestGroup("{composite.name}").count()</code>
              {" → "}
              <strong>{totalCount}</strong> solicitudes ·{" "}
              <code>.flatten()</code>
              {" → "}
              <strong>{flatItems.length}</strong> hojas
            </span>
          </div>
        </div>
      )}

      {showPicker && (
        <RequestPickerModal
          availableRequests={allRequests}
          alreadyAssigned={storedGroup.requestIds}
          onAssign={(rid) => { onAddRequest(storedGroup.id, rid); setShowPicker(false); }}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  );
};
