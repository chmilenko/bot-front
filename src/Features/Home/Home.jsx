import {  useEffect, Suspense } from "react";

import Header from "@Components/Header/Header";
import LogoSection from "@Components/LogoSection/LogoSection";
import CarouselItems from "@Components/Carousel/CarouselItems";
import Basket from "@Components/Basket/Basket";
import Loader from "@Components/Loader/Loader";

import useModels from "@Core/Store/models";
import Api from "@Core/Api/api";
import useMarks from "@Core/Store/marks";

const HomeDataLoader = () => {
  const { marks, setMarks } = useMarks();
  const {
    setModelsNike,
    setModelsAdidas,
    setModelsRickOwens,
    modelsNike,
    modelsAdidas,
    modelsRickOwens,
  } = useModels();

  useEffect(() => {
    const getModelsByMark = async (markName, setModels) => {
      const res = await Api.getModelsByMark(markName);
      setModels(res.data.data);
    };
    Promise.all([
      getModelsByMark("Nike", setModelsNike),
      getModelsByMark("Adidas", setModelsAdidas),
      getModelsByMark("Rick Owens", setModelsRickOwens),
      Api.getMarks().then((res) => setMarks(res.data)),
    ]);
  }, [setModelsNike, setModelsAdidas, setModelsRickOwens, setMarks]);

  return (
    <>
      <div className="container">
        <Header marks={marks} />
        <div className="logo_section">
          <LogoSection />
        </div>
        {modelsAdidas.length && modelsNike.length && modelsRickOwens.length ? (
          <>
            <CarouselItems items={modelsNike} sectionName="NIKE" />
            <CarouselItems items={modelsAdidas} sectionName="ADIDAS" />
            <CarouselItems items={modelsRickOwens} sectionName="RICK OWENS" />
          </>
        ) : (
          <Loader />
        )}
        <Basket />
      </div>
    </>
  );
};

const Home = () => (
  <Suspense fallback={<Loader />}>
    <HomeDataLoader />
  </Suspense>
);

export default Home;
