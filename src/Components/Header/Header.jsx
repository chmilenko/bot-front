import main from "@assets/logo/white.png";
import SelectComponent from "@Ui/Select/Select";
import Input from "@Ui/Input/Input";
import "./header.scss";

function Header() {
  const options = [
    { value: "apple", label: "Яблоко" },
    { value: "banana", label: "Банан" },
    { value: "orange", label: "Апельсин" },
  ];
  return (
    <div className="header">
      <img
        alt="logo"
        src={main}
        className="main_logo"
        style={{ width: 150, height: 150 }}
      />

      <div>
        <SelectComponent value="Категория" options={options} />
      </div>
      <div>
        <Input text="Поиск" />
      </div>
    </div>
  );
}

export default Header;
