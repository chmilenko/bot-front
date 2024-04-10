import "./home.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Header from "@Components/Header/Header";
import LogoSection from "@Components/LogoSection/LogoSection";
import CarouselItems from "@Components/Carousel/CarouselItems";
import Basket from "@Components/Basket/Basket";

import useModels from "@Core/Store/models";
import Api from "@Core/Api/api";

import { useEffect } from "react";

function Home() {
  const { setModels, models } = useModels();

  useEffect(() => {
    Api.getAllModels().then((res) => {
      setModels(res.data.data);
    });
  }, [setModels]);

  function filterMarks(mark) {
    return models.filter(
      (el) => el.attributes.mark.data.attributes.Name === mark
    );
  }

  return (
    <>
      <div className="container">
        <Header />
        <div className="logo_section">
          <LogoSection />
        </div>
        <CarouselItems items={models} sectionName="NIKE" />
        <CarouselItems items={models} sectionName="ADIDAS" />
        <CarouselItems items={models} sectionName="RICK OWENS" />
      </div>
      <Basket />
    </>
  );
}

export default Home;
