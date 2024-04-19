import useModelId from "@Hooks/useModelId";
import { useParams } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Input from "@Ui/Input/Input";
import Button from "@Ui/Button/Button";

import style from "./model.module.scss";
import { useState } from "react";
function ModelAdmin() {
  let id = useParams();

  const { oneModel } = useModelId(Number(id.id));

  console.log(oneModel);
  const [mark, setMark] = useState(oneModel.mark);
  const [model, setModel] = useState(oneModel.name);
  const [price, setPrice] = useState(oneModel.price);
  const [sizeCounts, setSizesCount] = useState(
    oneModel.sizes.map((el) => ({ size: el.size, count: el.count }))
  );
  console.log(sizeCounts);
  return (
    <div className={style.container}>
      <div className={style.model_info}>
        <Input value={mark} setValue={setMark} />
        <Input value={model} setValue={setModel} />
        <Input value={price} setValue={setPrice} />
        {sizeCounts.map((el, i) => (
          <div key={i} className={style.child}>
            <Input text="Размер" type="number" value={el.size} />
            <Input text="Количество" type="number" value={el.count} />
          </div>
        ))}
      </div>
      <div className="image_model">
        <Carousel>
          {oneModel?.photos?.map((photo) => (
            <img
              src={`http://localhost:4000/${photo.photo}`}
              style={{ width: "150px" }}
              key={photo.id}
            />
          ))}
          <Button text="Изменить" />
        </Carousel>
      </div>
    </div>
  );
}

export default ModelAdmin;
