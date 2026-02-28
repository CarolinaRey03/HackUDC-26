import CloseIcon from "@/assets/close.svg?react";
import type { ChildrenProp } from "@/interfaces";

interface ModalProps extends ChildrenProp {
  onClose: () => void;
}

function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="modal-container">
      <div className="modal-dialog">
        <span className="modal-header">
          <button className="modal-close-btn" onClick={onClose}>
            <CloseIcon />
          </button>
        </span>
        <div style={{ padding: "10px" }}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
