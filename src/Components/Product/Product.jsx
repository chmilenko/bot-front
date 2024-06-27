/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Name from "./Name";
import Price from "./Price";
import style from "./Styles/product.module.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";

function Product({ product, all }) {
  let navigate = useNavigate();

  const handleSetOneModel = (id) => {
    navigate(`/models/${id}`);
  };
  return (
    <div
      className={style.product}
      onClick={() => handleSetOneModel(product?.id)}
      key={product?.id}
      style={all && { width: "100%" }}
    >
      <LazyLoadImage
        src={`http://localhost:4000${product?.photos[0].photo}`}
        alt="Кроссовки"
        effect="blur"
        className={style.main_img}
      />
      <div className={style.info}>
        <div className={style.name_section}>
          <Name mark={product.mark} model={product?.name} />
        </div>
        <hr />
        <div>
          <Price price={product?.price} />
        </div>
      </div>
    </div>
  );
}

export default Product;
