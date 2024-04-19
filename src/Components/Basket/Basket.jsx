import { useState } from "react";
import Modal from "../Modal/Modal"; // Подключаем компонент Modal
import "./basket.scss";

function Basket() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="basket_container">
      <div className="basket-trigger" onClick={toggleModal}>
        Корзина
      </div>
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        Корзина пока пуста
      </Modal>
    </div>
  );
}

export default Basket;
