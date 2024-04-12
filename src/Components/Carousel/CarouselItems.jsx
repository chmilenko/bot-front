/* eslint-disable react/prop-types */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import SkeletonSection from "@Components/SkeletonSection/SkeletonSection";

import "./carousel.scss";
import { useNavigate } from "react-router-dom";

import Api from "@Core/Api/api";
import useOneModel from "@Core/Store/oneModel";

import Skeleton from "react-loading-skeleton";

function CarouselItems({ items, sectionName }) {
  let navigate = useNavigate();

  const { setOneModel } = useOneModel();

  const handleSetOneModel = (id) => {
    Api.getModelById(id).then((res) => setOneModel(res.data));
    navigate(`/models/${id}`);
  };

  return (
    <div className="items_section">
      <SkeletonSection text={sectionName} infiniteLoop={true} />
      <Carousel useKeyboardArrows={true} showThumbs={false}>
        {items?.map((item) => (
          <div
            className="product"
            onClick={() => handleSetOneModel(item.id)}
            key={item.id}
          >
            {item.Images[0].formats.medium?.url ? (
              <LazyLoadImage
                src={item.Images[0].formats.medium?.url}
                alt={item?.attributes?.Name}
                effect="blur"
              />
            ) : (
              <div>
                {" "}
                <Skeleton width={100} height={250} />
              </div>
            )}

            <div>
              <h3>
                {item?.mark?.Name} {item?.Name}
              </h3>
              <p className="price">Price: {item.Price}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselItems;
