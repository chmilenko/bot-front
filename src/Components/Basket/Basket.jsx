import "./basket.scss";
import { useState } from "react";

// import { useOrder } from "@Core/Store/order";

function Basket() {
  const [modalOpen, setModalOpen] = useState(false);

  // const { price } = useOrder();

  const toggleModal = () => {
    if (modalOpen) {
      document.body.classList.remove("modal-open");
    } else {
      document.body.classList.add("modal-open");
    }
    setModalOpen(!modalOpen);
  };

  return (
    <div className="backet_container">
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
