import { useState, useEffect } from "react";

import "./home.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Header from "@Components/Header/Header";
import LogoSection from "@Components/LogoSection/LogoSection";
import CarouselItems from "@Components/Carousel/CarouselItems";

function Home() {
  const [items, setItem] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error(error));
  }, [items]);

  return (
    <div className="container">
      <Header />
      <div>
        <LogoSection />
      </div>
      <CarouselItems items={items} sectionName="Nike" />
      <CarouselItems items={items} sectionName="Adidas" />
      <CarouselItems items={items} sectionName="Rick Owens" />
    </div>
  );
}

export default Home;
