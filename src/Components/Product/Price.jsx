import style from "./Styles/price.module.scss";

function formatPrice({price}) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₽";
}

function Price(price) {
  return <p className={style.price}>{formatPrice(price)}</p>;
}

export default Price;
