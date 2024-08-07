/* eslint-disable react/prop-types */
import { useEffect } from "react";
import "../basket.scss";
import useCartStore from "@Core/Store/cart";
import Api from "@Core/Api/api";
import increment from "@assets/increments.svg";
import decrement from "@assets/decrement.svg";
import Button from "@Ui/Button/Button";

function ModelsBasket({
  cartDetails,
  setCartDetails,
  handleClickStepTypeDelivery,
  textStep,
}) {
  const { cartItems, updateItemCount, removeFromCart } = useCartStore();

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
  }, [cartItems, setCartDetails]);

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

  return (
    <>
      {cartDetails.map((item, index) => (
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
              <p className="basket-item-info-up-size">Размер: {item.size}</p>
            </div>
            <div className="basket-item-info-down">
              <p className="basket-item-info-price">{item.price}</p>
              <div className="counter">
                <button
                  className="counter-decrement"
                  onClick={() =>
                    decrementCount(item.model_id, item.size_id, item.count)
                  }
                >
                  <img src={increment} alt="Increment" />
                </button>
                <p className="counter-count">{item.count}</p>
                <button
                  className="counter-increment"
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
      ))}
      <div className="action-order">
        <Button
          text={textStep}
          onClick={handleClickStepTypeDelivery && handleClickStepTypeDelivery}
        />
      </div>
    </>
  );
}

export default ModelsBasket;
