import "./Sdek.scss";
import Input from "@Ui/Input/Input";
import useCartStore from "@Core/Store/cart";
import { useEffect } from "react";

function Sdek() {
  const { typeSdek, updateTypeSdek } = useCartStore();

  useEffect(() => {
    return () => {
      updateTypeSdek({ name: "", address: "", phone: "" });
    };
  }, [updateTypeSdek]);

  return (
    <div className="sdek-container">
      <Input
        text="ФИО"
        value={typeSdek.name}
        setValue={(value) => updateTypeSdek({ name: value })}
      />
      <Input
        text="Введите ваш полный адрес(город, улица, дом, квартира/офис)"
        value={typeSdek.address}
        setValue={(value) => updateTypeSdek({ address: value })}
      />
      <Input
        text="Введите ваш номер телефона"
        value={typeSdek.phone}
        setValue={(value) => updateTypeSdek({ phone: value })}
      />
    </div>
  );
}

export default Sdek;
