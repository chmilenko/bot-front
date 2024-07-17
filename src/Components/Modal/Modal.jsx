import "./modal.scss";

// eslint-disable-next-line react/prop-types
function Modal({ isOpen, onClose, children, style }) {
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleModalClick}>
      <div className="modal-content" style={style}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
