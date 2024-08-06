import Input from "@Ui/Input/Input";
import "./City.scss";
import useCartStore from "@Core/Store/cart";
function Pickup() {
  const { typePickup } = useCartStore();

  return (
    <div className="city-container">
      <p>Адрес самовывоза находится по адресу: </p>
      <Input
        text="Укажите ваш контактный номер телефона"
        value={phone}
        setValue={setPhone}
      />
    </div>
  );
}

export default Pickup;
