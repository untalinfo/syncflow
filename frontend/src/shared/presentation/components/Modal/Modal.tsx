import { useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";

interface ModalProps {
  /** Content to render inside the portal */
  children: ReactNode;
  /** Called when the user clicks the backdrop or presses Escape */
  onClose: () => void;
  /** Extra class for the overlay (optional) */
  overlayClassName?: string;
  /** If true, clicking the backdrop does NOT close the modal */
  disableBackdropClose?: boolean;
}

/**
 * Shared Modal base component.
 *
 * Responsibilities:
 *  - Renders children via ReactDOM.createPortal → always on top of the DOM tree
 *  - Locks body scroll while open
 *  - Closes on Escape key press
 *  - Closes on backdrop click (unless disableBackdropClose is set)
 *
 * Usage:
 *   <Modal onClose={handleClose}>
 *     <div className="my-modal-panel">…</div>
 *   </Modal>
 */
export const Modal = ({
  children,
  onClose,
  overlayClassName = "",
  disableBackdropClose = false,
}: ModalProps) => {
  // Lock body scroll while the modal is mounted
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Global Escape key handler
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!disableBackdropClose && e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={`modal-portal-overlay ${overlayClassName}`.trim()}
      onClick={handleBackdropClick}
      role="presentation"
    >
      {children}
    </div>,
    document.body
  );
};
