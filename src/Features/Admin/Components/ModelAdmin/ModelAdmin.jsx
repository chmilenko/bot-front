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

  const [mark, setMark] = useState(oneModel.mark);
  const [model, setModel] = useState(oneModel.name);
  const [price, setPrice] = useState(oneModel.price);
  // eslint-disable-next-line no-unused-vars
  const [sizeCounts, setSizesCount] = useState(
    oneModel?.sizes?.map((el) => ({ size: el.size, count: el.count }))
  );
  sizeCounts;
  return (
    <div className={style.container}>
      <div className={style.model_info}>
        <Input value={mark} setValue={setMark} />
        <Input value={model} setValue={setModel} />
        <Input value={price} setValue={setPrice} />
        {sizeCounts?.map((el, i) => (
          <div key={i} className={style.child}>
            <Input
              text="Размер"
              type="number"
              value={el.size}
              setValue={(value) =>
                setSizesCount((prevState) =>
                  prevState.map((item, idx) =>
                    idx === i ? { ...item, size: value } : item
                  )
                )
              }
            />
            <Input
              text="Количество"
              type="number"
              value={el.count}
              setValue={(value) =>
                setSizesCount((prevState) =>
                  prevState?.map((item, idx) =>
                    idx === i ? { ...item, count: value } : item
                  )
                )
              }
            />
          </div>
        ))}
      </div>
      <div className={style.image_model}>
        <Carousel
          useKeyboardArrows={true}
          showThumbs={false}
          infiniteLoop={true}
        >
          {oneModel?.photos?.map((photo) => (
            // eslint-disable-next-line react/jsx-key
            <div className={style.image_model_item}>
              <img
                src={`http://localhost:4000/${photo.photo}`}
                style={{ width: "350px" }}
                key={photo.id}
              />
              <Button text="Изменить" />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default ModelAdmin;
