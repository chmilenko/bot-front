import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Basket from "@Components/Basket/Basket";

import "./model.scss";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import useOneModel from "@Core/Store/oneModel";


function ModelInfo() {
  const { oneModel } = useOneModel();
  let navigate = useNavigate();

  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleSizeClick = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
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
      </div>
      <Basket />
    </div>
  );
}

export default ModelInfo;
