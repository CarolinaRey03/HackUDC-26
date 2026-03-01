import { useState } from "react";
import CloseIcon from "@/assets/close.svg?react";
import type { ChildrenProp } from "@/interfaces";

interface ModalProps extends ChildrenProp {
  onClose: () => void;
}

function Modal({ onClose, children }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // matches animation duration
  };

  return (
    <div className={`modal-container ${isClosing ? "closing" : ""}`} onClick={handleClose}>
      <div
        className={`modal-dialog ${isClosing ? "closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="modal-header">
          <button className="modal-close-btn" onClick={handleClose}>
            <CloseIcon />
          </button>
        </span>
        <div style={{ padding: "10px" }}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
