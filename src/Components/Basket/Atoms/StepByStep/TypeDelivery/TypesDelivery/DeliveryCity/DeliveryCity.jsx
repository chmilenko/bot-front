import Input from "@Ui/Input/Input";
import "./DeliveryCity.scss";
import { useEffect } from "react";
import useCartStore from "@Core/Store/cart";

function DeliveryCity() {
  const { typeCity, updateTypeCity } = useCartStore();

  useEffect(() => {
    return () => {
      updateTypeCity({ name: "", address: "", phone: "" });
    };
  }, [updateTypeCity]);

  return (
    <div className="delivery-city-container ">
      <Input
        text="ФИО"
        value={typeCity.name}
        setValue={(value) => updateTypeCity({ name: value })}
      />
      <Input
        text="Укажите ваш контактный номер телефона"
        value={typeCity.phone}
        setValue={(value) => updateTypeCity({ phone: value })}
      />
      <Input
        text="Aдрес"
        value={typeCity.address}
        setValue={(value) => updateTypeCity({ address: value })}
      />
    </div>
  );
}

export default DeliveryCity;
