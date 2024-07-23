import Input from "@Ui/Input/Input";
import "./DeliveryCity.scss";

function DeliveryCity() {
  return (
    <div className="delivery-city-container ">
      <Input text="ФИО" />
      <Input text="Укажите ваш контактный номер телефона" />
      <Input text="Aдрес" />
    </div>
  );
}

export default DeliveryCity;
