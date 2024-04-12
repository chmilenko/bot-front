import useOneModel from "@Core/Store/oneModel";
import Basket from "@Components/Basket/Basket";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./model.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

function ModelInfo() {
  const { oneModel } = useOneModel();
  let allSizes = [
    36, 36.5, 37, 37.5, 38, 38.5, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.5, 43,
    43.5, 44, 44.5, 45, 45.5, 46, 46.5, 47,
  ];
  console.log(oneModel.data.sizes);
  let navigate = useNavigate();
  console.log(oneModel);
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
          {allSizes.map((size, i) => (
            <button
              key={i}
              className="size"
              disabled={!oneModel?.data?.sizes?.some((s) => s.Size === size)}
            >
              {size}
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
