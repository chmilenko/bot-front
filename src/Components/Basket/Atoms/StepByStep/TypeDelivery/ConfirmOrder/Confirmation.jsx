import useCartStore from "@Core/Store/cart";
import ModelsBasket from "../../../ModelsBasket";
import { useEffect, useState } from "react";
import Api from "@Core/Api/api";
import Button from "@Ui/Button/Button";

function Confirmation({ handleClickRefStep }) {
  const { cartItems } = useCartStore();
  // eslint-disable-next-line no-unused-vars
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
  }, [cartItems, setCartDetails]);

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
  return (
    <div>
      <div onClick={() => handleClickRefStep("typeDelivery")}>Назад</div>
      <h3>Подтверждение заказа</h3>
      <div>
        <p>Ваш заказ:</p>
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
                  <p className="basket-item-info-up-size">
                    Размер: {item.size}
                  </p>
                </div>
                <div className="basket-item-info-down">
                  <p className="basket-item-info-price">Цена: {item.price}</p>
                  <div className="counter">
                    <p className="counter-count"> Количество: {item.count}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
        <p>Итоговая цена: {totalPrice}</p>
        <Button text="Сделать заказ" />
      </div>
    </div>
  );
}

export default Confirmation;
