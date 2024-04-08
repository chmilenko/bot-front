import "./home.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Header from "@Components/Header/Header";
import LogoSection from "@Components/LogoSection/LogoSection";
import CarouselItems from "@Components/Carousel/CarouselItems";
import Basket from "../../Components/Basket/Basket";
import { data } from "../../mock";

function Home() {
  console.log(data);
  return (
    <>
      <div className="container">
        <Header />
        <div className="logo_section">
          <LogoSection />
        </div>
        <CarouselItems items={data} sectionName="NIKE" />
        <CarouselItems items={data} sectionName="ADIDAS" />
        <CarouselItems items={data} sectionName="RICK OWENS" />
      </div>
      <Basket />
    </>
  );
}

export default Home;
