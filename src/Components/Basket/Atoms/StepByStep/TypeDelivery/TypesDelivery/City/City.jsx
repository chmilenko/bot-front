import Input from "@Ui/Input/Input";
import "./City.scss";

function City() {
  return (
    <div className="city-container">
      <p>Адрес самовывоза находится по адресу: </p>
      <Input text="Укажите ваш контактный номер телефона" />
    </div>
  );
}

export default City;
