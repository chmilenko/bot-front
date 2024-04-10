/* eslint-disable react/prop-types */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import SkeletonSection from "@Components/SkeletonSection/SkeletonSection";

import "./carousel.scss";

function CarouselItems({ items, sectionName }) {
  // Собираем firstImage для каждого элемента заранее

console.log(items.map((el) => console.log(el.attributes.Images.data[0].attributes.formats.medium?.url)));
  return (
    <div className="items_section">
      <SkeletonSection text={sectionName} infiniteLoop={true} />
      <Carousel useKeyboardArrows={true}>
        {items?.map((item) => (
          <div className="product" key={item.id}>
            <img
              src={
                item.attributes.Images.data[0].attributes.formats.medium?.url
              }
              alt={item?.attributes?.Name}

            />

            <div>
              <h3>
                {item?.attributes?.mark?.data?.attributes?.Name}{" "}
                {item?.attributes?.Name}
              </h3>
              <p className="price">Price: {item.attributes.Price}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselItems;
