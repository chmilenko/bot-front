import Input from "@Ui/Input/Input";
import "./DeliveryCity.scss";
import { useState } from "react";
import useCartStore from "@Core/Store/cart";

function DeliveryCity() {
  const { typeCity } = useCartStore();
  return (
    <div className="delivery-city-container ">
      <Input text="ФИО" />
      <Input text="Укажите ваш контактный номер телефона" />
      <Input text="Aдрес" />
    </div>
  );
}

export default DeliveryCity;
