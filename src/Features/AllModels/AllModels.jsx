import Api from "@Core/Api/api";
import useModels from "@Core/Store/models";
import { useEffect } from "react";

import style from "./all.module.scss";

import Product from "@Components/Product/Product";

function AllModels() {
  const { setAllModels, allModels } = useModels();
  useEffect(() => {
    Api.getAllSneakers().then((res) => setAllModels(res.data));
  }, [setAllModels]);

  return (
    <div className={style.container}>
      {allModels.map((product) => (
        <Product product={product} key={product.id} all={true}/>
      ))}
    </div>
  );
}

export default AllModels;
