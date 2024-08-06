import Input from "@Ui/Input/Input";
import "./City.scss";
import useCartStore from "@Core/Store/cart";
import { useEffect } from "react";

function Pickup() {
  const { typePickup, updateTypePickup } = useCartStore();

  useEffect(() => {
    return () => {
      updateTypePickup({ phone: "" });
    };
  }, [updateTypePickup]);

  return (
    <div className="city-container">
      <p>Адрес самовывоза находится по адресу: </p>
      <Input
        text="Укажите ваш контактный номер телефона"
        value={typePickup.phone}
        setValue={(value) => updateTypePickup({ phone: value })}
      />
    </div>
  );
}

export default Pickup;
