/* eslint-disable react/prop-types */
import main from "@assets/logo/black.png";
// import SelectComponent from "@Ui/Select/Select";
import Input from "@Ui/Input/Input";
import style from "./header.module.scss";
import Button from "../../UI/Button/Button";

function Header({ blur, onFocus }) {
  return (
    <div className={style.header}>
      {!blur && (
        <div className={style.logo}>
          <h3 className={style.name}>POIZON</h3>
          <img alt="logo" src={main} className={style.main_logo} />
          <h3 className={style.name}>DISCOUNT</h3>
        </div>
      )}
      {blur && (
        <div className={style.header_focus}>
          <Button
            onClick={() => onFocus(false)}
            text="Назад"
            className="back"
          />
          <img alt="logo" src={main} className={style.main_logo} />
        </div>
      )}
      <div>
        <Input text="Поиск" blur={blur} onFocus={onFocus} />
      </div>
    </div>
  );
}

export default Header;
