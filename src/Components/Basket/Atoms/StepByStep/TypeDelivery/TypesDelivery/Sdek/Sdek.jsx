import "./Sdek.scss";
import Input from "@Ui/Input/Input";

function Sdek() {
  return (
    <div className="sdek-container">
      <Input text="ФИО" />
      <Input text="Введите ваш полный адрес(город, улица, дом, квартира/офис)" />
      <Input text="Введите ваш номер телефона" />
    </div>
  );
}

export default Sdek;
