import React from "react";
import { RiGitPrDraftLine } from "@remixicon/react";
import { useRequestPage } from "../../application/hooks/useRequestPage";
import { RequestDetailModal } from "../components/RequestDetailModal/RequestDetailModal";
import { DeleteModal } from "../components/DeleteModal/DeleteModal";
import { RequestHeader } from "../components/RequestHeader/RequestHeader";
import { RequestCard } from "../components/RequestCard/RequestCard";
import "./RequestPage.scss";

export const RequestPage: React.FC = () => {
  const {
    requests,
    isSyncing,
    pendingDelete,
    isDeleting,
    pendingDetail,
    handleSync,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleCardClick,
    setPendingDetail,
    pendingCount,
  } = useRequestPage();

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

      <RequestHeader
        handleSync={handleSync}
        isSyncing={isSyncing}
        pendingCount={pendingCount}
      />

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
              <RequestCard
                key={req.id || index}
                request={req}
                onCardClick={handleCardClick}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
