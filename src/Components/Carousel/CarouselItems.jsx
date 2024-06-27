/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img from "@assets/delimiter.svg";

import "react-lazy-load-image-component/src/effects/blur.css";

import style from "./carousel.module.scss";

import Product from "../Product/Product";

function CarouselItems({ items, sectionName }) {


  return (
    <div className={style.container}>
      <div className={style.name_container}>
        <h3 className={style.section_name}>{sectionName}</h3>
        <img alt="delimiter" src={img} style={{ width: "100%" }} />
      </div>
      <div className={style.items_section}>
        <Carousel
          useKeyboardArrows={true}
          showThumbs={false}
          infiniteLoop={true}
        >
          {items?.map((item) => (
            <Product product={item}/>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselItems;
