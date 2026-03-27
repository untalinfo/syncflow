import React from "react";
import { RiGitPrDraftLine } from "@remixicon/react";
import "./RequestHeader.scss";

interface RequestHeaderProps {
  handleSync: () => void;
  isSyncing: boolean;
  pendingCount: number;
}

export const RequestHeader: React.FC<RequestHeaderProps> = ({ handleSync, isSyncing, pendingCount }) => {
  return (
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
  );
};
