import React, { useEffect, useState } from "react";
import {
  RiCloseLine,
  RiFileCopyLine,
  RiCheckLine,
  RiTimeLine,
  RiCloudOffLine,
  RiAddCircleLine,
  RiErrorWarningLine,
  RiCheckboxCircleLine,
  RiLoader4Line,
} from "@remixicon/react";
import type { SyncRequest } from "../../../../../domain/IRequestNode";
import "./RequestDetailModal.scss";

interface RequestDetailModalProps {
  request: SyncRequest;
  onClose: () => void;
}

type TimelineEventType = "created" | "pending" | "processed" | "failed";

interface TimelineEvent {
  type: TimelineEventType;
  title: string;
  subtitle: string;
  time: string;
}

function buildTimeline(req: SyncRequest): TimelineEvent[] {
  const createdAt = new Date(req.createdAt).toLocaleString();
  const events: TimelineEvent[] = [
    {
      type: "created",
      title: "Request Created",
      subtitle: "Stored in local storage (offline-first)",
      time: createdAt,
    },
  ];

  if (req.status === "Processed") {
    events.unshift({
      type: "processed",
      title: "Synced to Backend",
      subtitle: "Successfully registered in the remote server",
      time: createdAt,
    });
  } else if (req.status === "Failed") {
    events.unshift({
      type: "failed",
      title: "Sync Failed",
      subtitle: "Could not reach remote backend",
      time: createdAt,
    });
  } else {
    events.unshift({
      type: "pending",
      title: "Queued Offline",
      subtitle: "Waiting for connectivity to sync",
      time: createdAt,
    });
  }

  return events;
}

const TimelineDotIcon: React.FC<{ type: TimelineEventType }> = ({ type }) => {
  const size = 16;
  if (type === "created")   return <RiAddCircleLine size={size} />;
  if (type === "pending")   return <RiLoader4Line size={size} />;
  if (type === "processed") return <RiCheckboxCircleLine size={size} />;
  return <RiErrorWarningLine size={size} />;
};

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  request,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleCopy = () => {
    navigator.clipboard.writeText(request.payload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const statusLower = request.status.toLowerCase() as
    | "pending"
    | "processed"
    | "failed";

  const timeline = buildTimeline(request);

  const isOffline = request.status === "Pending" || request.status === "Failed";

  return (
    <div
      className="detail-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="detail-modal">
        {/* ── Header ── */}
        <div className="detail-modal__header">
          <div className="header-left">
            <div className="request-id-row">
              <span className="req-id-badge">
                {request.id.slice(0, 8).toUpperCase()}
              </span>
              <span className={`status-badge status-badge--${statusLower}`}>
                <span className={`status-dot status-dot--${statusLower}`} />
                {request.status}
              </span>
            </div>
            <h2 className="request-name" id="detail-modal-title">
              {request.name}
            </h2>
          </div>

          <div className="header-right">
            <button
              id="detail-modal-close"
              className="btn-close"
              onClick={onClose}
              aria-label="Close detail view"
            >
              <RiCloseLine size={18} />
            </button>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="detail-modal__body">

          {/* Type */}
          <div className="detail-card">
            <p className="detail-card__label">Processing Type</p>
            <p className="detail-card__value detail-card__value--mono">
              {request.type || "—"}
            </p>
          </div>

          {/* Created At */}
          <div className="detail-card">
            <p className="detail-card__label">Created At</p>
            <p className="detail-card__value">
              {new Date(request.createdAt).toLocaleString()}
            </p>
          </div>

          {/* Full ID */}
          <div className="detail-card detail-card--full">
            <p className="detail-card__label">Full ID</p>
            <p className="detail-card__value detail-card__value--mono">
              {request.id}
            </p>
          </div>

          {/* Payload */}
          <div className="payload-card">
            <div className="payload-card__header">
              <span>Request Payload</span>
              <button
                className={`btn-copy ${copied ? "copied" : ""}`}
                onClick={handleCopy}
                aria-label="Copy payload"
              >
                {copied ? (
                  <>
                    <RiCheckLine size={14} /> Copied!
                  </>
                ) : (
                  <>
                    <RiFileCopyLine size={14} /> Copy
                  </>
                )}
              </button>
            </div>
            <div className="payload-card__body">{request.payload}</div>
          </div>

          {/* Timeline */}
          <div className="timeline-card">
            <p className="timeline-card__label">Activity Timeline</p>
            <div className="timeline">
              {timeline.map((evt, i) => (
                <div key={i} className="timeline-item">
                  <div className={`timeline-dot timeline-dot--${evt.type}`}>
                    <TimelineDotIcon type={evt.type} />
                  </div>
                  <div className="timeline-content">
                    <p className="timeline-title">{evt.title}</p>
                    <p className="timeline-sub">{evt.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Offline Resilience card – only for pending/failed */}
          {isOffline && (
            <div className="offline-card">
              <div className="offline-card__icon">
                <RiCloudOffLine size={20} />
              </div>
              <div className="offline-card__content">
                <p>
                  This request is stored in your local storage and will be
                  automatically synced to the backend once a stable connection
                  is established.
                </p>
                <span className="offline-note">
                  <RiTimeLine size={12} style={{ display: "inline", marginRight: 4 }} />
                  Awaiting connectivity…
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
