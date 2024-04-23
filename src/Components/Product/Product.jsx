/* eslint-disable react/prop-types */
import Name from "./Name";
import Price from "./Price";
import style from "./Styles/product.module.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";

function Product({ product, onClick, all }) {
  return (
    <div
      className={style.product}
      onClick={() => onClick(product?.id)}
      key={product?.id}
      style={all && { width: "300px" }}
    >
      <LazyLoadImage
        src={`http://localhost:4000${product?.photos[0].photo}`}
        alt="Кроссовки"
        effect="blur"
        className={style.main_img}
      />
      <div className={style.info}>
        <Name mark={product.mark} model={product?.name} />
        <hr />
        <Price price={product?.price} />
      </div>
    </div>
  );
}

export default Product;
