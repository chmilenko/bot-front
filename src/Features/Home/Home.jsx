import { useEffect, Suspense, useState } from "react";

import Header from "@Components/Header/Header";
import CarouselItems from "@Components/Carousel/CarouselItems";
import Loader from "@Components/Loader/Loader";
import Basket from "@Components/Basket/Basket";

import useModels from "@Core/Store/models";
import Api from "@Core/Api/api";

import style from "./home.module.scss";
import AllModels from "../AllModels/AllModels";

const HomeDataLoader = () => {
  const [blur, setBlur] = useState(false);
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
      const res = await Api.getAllSneakers(markName);
      setModels(res.data);
    };
    Promise.all([
      getModelsByMark("Nike", setModelsNike),
      getModelsByMark("Adidas", setModelsAdidas),
      getModelsByMark("New Balance", setModelsRickOwens),
    ]);
  }, [setModelsNike, setModelsAdidas, setModelsRickOwens]);

  return (
    <>
      <div className={style.container}>
        <Header blur={blur} onFocus={setBlur} />
        {!blur && (
          <>
            <CarouselItems items={modelsNike} sectionName="NIKE" />
            <CarouselItems items={modelsAdidas} sectionName="ADIDAS" />
            <CarouselItems items={modelsRickOwens} sectionName="NEW BALANCE" />
            <Basket />
          </>
        )}
        {blur && (
          <>
            <AllModels />
            <Basket />
          </>
        )}
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
