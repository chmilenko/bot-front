import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import "./basket.scss";
import useCartStore from "@Core/Store/cart"; // Импортируйте хранилище корзины

function Basket() {
  const [modalOpen, setModalOpen] = useState(false);
  const { cartItems } = useCartStore();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cartItems]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="basket_container">
      <div className="basket-trigger" onClick={toggleModal}>
        Корзина {totalPrice}
      </div>
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        {cartItems.length > 0
          ? cartItems.map((item, index) => (
              <div key={index}>
                Модель ID: {item.model_id}, Размер ID: {item.size_id}, Цена:{" "}
                {item.price}, Количество: {item.count}
              </div>
            ))
          : "Корзина пока пуста"}
      </Modal>
    </div>
  );
}

export default Basket;
