/* eslint-disable react/prop-types */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import SkeletonSection from "@Components/SkeletonSection/SkeletonSection";

import "./carousel.scss";
// eslint-disable-next-line react/prop-types
function CarouselItems({ items, sectionName }) {
  return (
    <div className="items_section">
      <SkeletonSection text={sectionName} />
      <Carousel useKeyboardArrows={true}>
        {items?.map((item, index) => (
          <div className="product" key={index}>
            <img
              src={item.image}
              width={130}
              height={130}
              alt="Picture of the author"
            />
            <div>
              <h3>Название: {item.title}</h3>
              <p className="price">Price: {item.price}</p>
              <p className="rating">Rating: {item.rating.rate}</p>
              <p className="count">Count buy: {item.rating.count}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselItems;
