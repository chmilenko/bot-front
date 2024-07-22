import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Basket from "@Components/Basket/Basket";
import useOneModel from "@Core/Store/oneModel";
import useCartStore from "@Core/Store/cart"; // Импортируйте хранилище корзины
import Api from "@Core/Api/api";
import Button from "../../UI/Button/Button";

import "./model.scss";
import main from "@assets/logo/black.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ModelInfo() {
  let navigate = useNavigate();

  const { oneModel, setOneModel } = useOneModel();
  const { cartItems, addToCart, removeFromCart } = useCartStore();
  const [selectedSizes, setSelectedSizes] = useState([]);

  let { id } = useParams();

  const handleSizeClick = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
      removeFromCart(id, size.size_id);
    } else {
      setSelectedSizes([...selectedSizes, size]);
      addToCart(
        id,
        size.size_id,
        Number(size.size),
        oneModel.price,
        size.count
      );
    }
  };

  useEffect(() => {
    Api.getModelById(id).then((res) => setOneModel(res.data));
  }, [id, setOneModel]);

  useEffect(() => {
    const updatedSelectedSizes = selectedSizes.filter((size) =>
      cartItems.some(
        (item) => item.model_id === id && item.size_id === size.size_id
      )
    );
    setSelectedSizes(updatedSelectedSizes);
  }, [cartItems, id]);

  return (
    <div className="container_model">
      <div className="header_child">
        <Button onClick={() => navigate(-1)} text="Назад" className="back" />
        <img alt="logo" src={main} className="main_logo" />
      </div>
      <div className="model">
        <Carousel
          useKeyboardArrows={true}
          showThumbs={false}
          infiniteLoop={true}
        >
          {oneModel?.photos?.map((img) => (
            <LazyLoadImage
              src={`http://localhost:4000${img.photo}`}
              key={img.id}
              className="sneaker_image"
            />
          ))}
        </Carousel>
        <div className="model_info">
          <h3 className="name_model">
            {oneModel?.mark} {oneModel?.name}
          </h3>
          <p className="model_description">{oneModel?.description}</p>
          <div className="sizes">
            {oneModel?.sizes?.map(
              (size, i) =>
                size.count > 0 && (
                  <button
                    key={i}
                    className={
                      selectedSizes.includes(size) ? "size_active" : "btn_size"
                    }
                    onClick={() => handleSizeClick(size)}
                  >
                    {size.size}
                  </button>
                )
            )}
          </div>
          <hr />
          <h3 className="price">{oneModel?.price}</h3>
        </div>
      </div>
      <Basket />
    </div>
  );
}

export default ModelInfo;
