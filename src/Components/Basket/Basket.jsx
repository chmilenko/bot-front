import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import "./basket.scss";
import useCartStore from "@Core/Store/cart";
import Api from "@Core/Api/api";
import increment from "@assets/increments.svg";
import decrement from "@assets/decrement.svg";

function Basket() {
  const [modalOpen, setModalOpen] = useState(false);
  const { cartItems, updateItemCount, removeFromCart } = useCartStore();
  const [cartDetails, setCartDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchCartDetails = async () => {
      const promises = cartItems.map(async (item) => {
        const response = await Api.getModelById(item.model_id);
        const sizeInfo = response.data.sizes.find(
          (size) => size.size_id === item.size_id
        );
        return {
          model_id: item.model_id,
          mark: response.data.mark,
          name: response.data.name,
          photo: response.data.photos[0].photo,
          size_id: item.size_id,
          size: sizeInfo.size,
          count: item.count,
          totalCount: sizeInfo.count,
          price: Number(item.price),
        };
      });
      const results = await Promise.all(promises);
      setCartDetails(results);
    };

    fetchCartDetails();
  }, [cartItems]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cartDetails.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cartDetails]);

  const incrementCount = (modelId, sizeId, currentCount, totalCount) => {
    if (currentCount < totalCount) {
      updateItemCount(modelId, sizeId, currentCount + 1);
    } else {
      alert("Вы выбрали максимальное доступное количество кроссовок.");
    }
  };

  const decrementCount = (modelId, sizeId, currentCount) => {
    if (currentCount > 1) {
      updateItemCount(modelId, sizeId, currentCount - 1);
    } else {
      removeFromCart(modelId, sizeId);
    }
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      {!modalOpen && (
        <div className="basket_container">
          <div className="basket-trigger" onClick={toggleModal}>
            Корзина ({totalPrice} руб.)
          </div>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <div className="modal-basket">
          <div onClick={toggleModal}>Закрыть</div>
          {cartDetails.length > 0 ? (
            cartDetails.map((item, index) => (
              <div key={index} className="basket-item">
                <img
                  src={`http://localhost:4000${item.photo}`}
                  alt={item.name}
                  className="basket-item-photo"
                />
                <div className="basket-item-info">
                  <div className="basket-item-info-up">
                    <p className="basket-item-info-up-name">
                      {item.mark} {item.name}
                    </p>
                    <p className="basket-item-info-up-size">
                      Размер: {item.size}
                    </p>
                  </div>
                  <div className="basket-item-info-down">
                    <p className="basket-item-info-price">{item.price}</p>
                    <div className="counter">
                      <button
                        className="counter-increment"
                        onClick={() =>
                          decrementCount(
                            item.model_id,
                            item.size_id,
                            item.count
                          )
                        }
                      >
                        <img src={increment} alt="Increment" />
                      </button>
                      <p className="counter-count">{item.count}</p>
                      <button
                        className="counter-decrement"
                        onClick={() =>
                          incrementCount(
                            item.model_id,
                            item.size_id,
                            item.count,
                            item.totalCount
                          )
                        }
                      >
                        <img src={decrement} alt="Decrement" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Корзина пока пуста</p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default Basket;
