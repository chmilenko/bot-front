/* eslint-disable react/prop-types */
import style from "./Styles/name.module.scss";
function Name({mark, model}) {
  return (
    <h3 className={style.name}>
      {mark} {model}
    </h3>
  );
}

export default Name;
