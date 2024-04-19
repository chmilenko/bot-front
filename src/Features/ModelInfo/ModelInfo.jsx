import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import Basket from "@Components/Basket/Basket";

import "./model.scss";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import useOneModel from "@Core/Store/oneModel";
import Api from "@Core/Api/api";
import { useEffect } from "react";

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
    Api.getModelById(id).then((res) => setOneModel(res.data));
  }, [id, setOneModel]);
  const setOrder = () => {

    const data = {
      data: {
        User: "@Test", 
        models: [id],
        sizes: selectedSizes.map((size) => ({ id: size.id })), 
      },
    };
    console.log(data);
    Api.postOrder(data)
      .then((response) => {
        console.log("Заказ успешно создан:", response);
      })
      .catch((error) => {
        console.error("Ошибка при создании заказа:", error);
      });
  };
  return (
    <div className="container_model">
      <div onClick={() => navigate(-1)}>Назад</div>
      <Carousel useKeyboardArrows={true} showThumbs={false}>
        {oneModel?.data?.Images.map((img) => (
          <LazyLoadImage src={img.formats.medium.url} key={img.id} />
        ))}
      </Carousel>
      <div className="model_info">
        <h3 className="name_model">
          {oneModel?.data?.mark?.Name} {oneModel?.data?.Name}
        </h3>
        <div className="sizes">
          {oneModel?.data?.sizes?.map((size, i) => (
            <button
              key={i}
              className={selectedSizes.includes(size) ? "size_active" : "size"}
              onClick={() => handleSizeClick(size)}
            >
              {size.size}
            </button>
          ))}
        </div>
        <div className="description">{oneModel?.data?.Description}</div>
        {selectedSizes.length && (
          <button onClick={setOrder}>Сделать заказ</button>
        )}
      </div>
      <Basket />
    </div>
  );
}

export default ModelInfo;
