
import "./modal.scss";

// eslint-disable-next-line react/prop-types
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  return (
    <div className="modal" onClick={handleModalClick}>
      <div className="modal_content">
        {children} 
      </div>
    </div>
  );
}

export default Modal;
