import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Basket from "@Components/Basket/Basket";

import "./model.scss";
import main from "@assets/logo/black.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import useOneModel from "@Core/Store/oneModel";
import Api from "@Core/Api/api";
import { useEffect } from "react";
import Button from "../../UI/Button/Button";

// import { useOrder } from "@Core/Store/order";

function ModelInfo() {
  const { oneModel, setOneModel } = useOneModel();
  let navigate = useNavigate();
  let id = useParams();
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeClick = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  useEffect(() => {
    Api.getModelById(id.id).then((res) => setOneModel(res.data));
  }, [id, setOneModel]);

  const setOrder = () => {
    const orderItems = selectedSizes.map((size) => ({
      model_id: id.id,
      size_id: size.size_id,
      count_id: 2,
    }));

    Api.postOrder({
      user: "@Test",
      items: orderItems,
    })
      .then((response) => {
        console.log("Заказ успешно создан:", response);
      })
      .catch((error) => {
        console.error("Ошибка при создании заказа:", error);
      });
  };
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
          <p>{oneModel?.description}</p>

          <div className="sizes">
            {oneModel?.sizes?.map((size, i) => (
              <button
                key={i}
                className={
                  selectedSizes.includes(size) ? "size_active" : "btn_size"
                }
                onClick={() => handleSizeClick(size)}
              >
                {size.size}
              </button>
            ))}
          </div>
          <hr />
          <h3 className="price">{oneModel?.price}</h3>
          {!!selectedSizes.length && (
            <button onClick={setOrder}>Сделать заказ</button>
          )}
        </div>
      </div>
      <Basket />
    </div>
  );
}

export default ModelInfo;
