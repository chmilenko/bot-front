import "./basket.scss";
import { useState } from "react";

function Basket() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    if (modalOpen) {
      document.body.classList.remove("modal-open");
    } else {
      document.body.classList.add("modal-open");
    }
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <div className="basket-trigger" onClick={toggleModal}>
        Корзина
      </div>
      {modalOpen && (
        <div className="modal" onClick={toggleModal}>
          <div className="modal_content"> Корзина пока пуста</div>
        </div>
      )}
    </div>
  );
}

export default Basket;
