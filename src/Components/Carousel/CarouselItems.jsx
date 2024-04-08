/* eslint-disable react/prop-types */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import SkeletonSection from "@Components/SkeletonSection/SkeletonSection";

import "./carousel.scss";
// eslint-disable-next-line react/prop-types
function CarouselItems({ items, sectionName }) {
  return (
    <div className="items_section">
      <SkeletonSection text={sectionName} infiniteLoop={true}/>
      <Carousel useKeyboardArrows={true}>
        {items?.map((item) => (
          <div className="product" key={item.id}>
            <img
              src={item.img}
              width={190}
              height={230}
              alt="Picture of the author"
            />
            <div>
              <h3>Название: {item.name}</h3>
              <p className="price">Price: {item.price}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselItems;
