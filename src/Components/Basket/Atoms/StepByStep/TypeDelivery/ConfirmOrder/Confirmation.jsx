import { useEffect, useState } from "react";
import useCartStore from "@Core/Store/cart";
import Api from "@Core/Api/api"; // Импортируйте ваш API

function Confirmation({ handleClickRefStep, cartDetails, setCartDetails }) {
  const {
    cartItems,
    selectedDeliveryType,
    typePickup,
    typeCity,
    typeSdek,
    user,
  } = useCartStore();
  const [deliveryTypeInfo, setDeliveryTypeInfo] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (selectedDeliveryType !== null) {
      Api.getTypeDelivery(selectedDeliveryType)
        .then((response) => setDeliveryTypeInfo(response.data))
        .catch((error) =>
          console.error("Ошибка при загрузке типа доставки:", error)
        );
    }
  }, [selectedDeliveryType]);
  console.log(deliveryTypeInfo);

  const deliveryData =
    selectedDeliveryType === 1
      ? typePickup
      : selectedDeliveryType === 2
      ? typeCity
      : selectedDeliveryType === 3
      ? typeSdek
      : {};

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
  console.log(cartItems);
  const handleOrderSubmit = async () => {
    try {
      const orderData = {
        user: "@Test",
        items: cartItems.map((item) => ({
          model_id: item.model_id,
          size_id: item.size_id,
          count_id: item.count,
        })),
        delivery: {
          type_id: selectedDeliveryType,
          data: deliveryData,
        },
      };
      const response = await Api.postOrder(orderData);
      console.log("Заказ создан:", response.data);
      handleClickRefStep("orderConfirmed");
    } catch (error) {
      console.error("Ошибка при создании заказа:", error);
    }
  };

  return (
    <div className="confirmation-content">
      <div
        className="confirmation-content-back"
        onClick={() => handleClickRefStep("typeDelivery")}
      >
        Назад
      </div>
      <div className="confirmation-content-details">
        <h2>Ваш заказ</h2>
        {cartDetails &&
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
                    <p className="counter-count">{item.count}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <p>Цена: {totalPrice}</p>
        <h2>Тип доставки</h2>
        {deliveryTypeInfo ? (
          <div>
            <p>{deliveryTypeInfo.name}</p>
          </div>
        ) : (
          <p>Загрузка информации о типе доставки...</p>
        )}
        <h2>Данные доставки</h2>
        <ul>
          {Object.keys(deliveryData).map((key) => (
            <li key={key}>
              {key}: {deliveryData[key]}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleOrderSubmit}>Подтвердить заказ</button>
    </div>
  );
}

export default Confirmation;
