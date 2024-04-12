import useOneModel from "@Core/Store/oneModel";
import Basket from "@Components/Basket/Basket";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "./model.scss";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

function ModelInfo() {

  const { oneModel } = useOneModel();

  let navigate = useNavigate();

  return (
    <div className="container_model">
      <div onClick={() => navigate(-1)}>Назад</div>
      <Carousel useKeyboardArrows={true} showThumbs={false}>
        {oneModel?.data?.attributes.Images.data.map((img) => (
          <LazyLoadImage src={img.attributes.formats.medium.url} key={img.id} />
        ))}
      </Carousel>
      <div className="model_info">
        <h3 className="name_model">
          {oneModel?.data?.attributes?.mark?.data?.attributes?.Name}{" "}
          {oneModel?.data?.attributes.Name}
        </h3>
        <div className="sizes">
          {oneModel?.data?.attributes?.size?.data?.attributes?.Sizes?.map(
            (size, i) => (
              <button key={i} className="size">{size.size}</button>
            )
          )}
        </div>
          <div className="description">
            {oneModel?.data?.attributes?.Description}
          </div>
      </div>
      <Basket />
    </div>
  );
}

export default ModelInfo;
