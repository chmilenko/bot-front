import { useEffect, useState } from "react";

import Api from "@Core/Api/api";
import useMarks from "@Core/Store/marks";

import Combined from "@Ui/InputSelect/Combined";
import Input from "@Ui/Input/Input";
import Button from "@Ui/Button/Button";

import "./newsneaker.scss";

function NewSneakers() {
  const { setMarks, marks } = useMarks();

  const [mark, setMark] = useState();
  const [model, setModel] = useState();
  const [price, setPrice] = useState();
  const [sizeCounts, setSizesCount] = useState([{ size: "", count: "" }]);

  const [mainPhoto, setMainPhoto] = useState(null);
  const [two, setTwo] = useState(null);
  const [three, setThree] = useState(null);
  const [four, setFour] = useState(null);
  const [five, setFive] = useState(null);
  const [six, setSix] = useState(null);

  useEffect(() => {
    Api.getModelsByMark().then((res) => setMarks(res.data));
  }, [setMarks]);

  function addSizeCount() {
    setSizesCount([...sizeCounts, { size: "", count: "" }]);
  }

  function removeSizeCount(index) {
    setSizesCount(sizeCounts.filter((el, i) => i !== index));
  }

  function handleSizeChange(index, value) {
    const updatedSizesCount = [...sizeCounts];
    updatedSizesCount[index].size = value;
    setSizesCount(updatedSizesCount);
  }

  function handleCountChange(index, value) {
    const updatedSizesCount = [...sizeCounts];
    updatedSizesCount[index].count = value;
    setSizesCount(updatedSizesCount);
  }

  const addNewSneakers = async () => {
    const data = {
      mark,
      model,
      price,
      sizeCounts,
    };

    const res = await Api.addNewSneakers(data);
    const files = [mainPhoto, two, three, four, five, six];
    const names = ["mainPhoto", "two", "three", "four", "five", "six"];
    const formData = new FormData();
    files.forEach((file, i) => {
      formData.append(names[i], file);
    });

    await Api.addPhotoSneakers(res.data.id, formData);
  };

  return (
    <div className="container_new_sneaker">
      <div className="main_info">
        <Combined options={marks} value={mark} setValue={setMark} />
        <Input text="Название модели" value={model} setValue={setModel} />
        <Input text="Цена" type="number" value={price} setValue={setPrice} />
      </div>
      <div className="sizes_count">
        {sizeCounts.map((el, i) => (
          <div key={i} className="child">
            <Input
              text="Размер"
              type="number"
              value={el.size}
              setValue={(value) => handleSizeChange(i, value)}
            />
            <Input
              text="Количество"
              type="number"
              value={el.count}
              setValue={(value) => handleCountChange(i, value)}
            />
            <Button text="Удалить" onClick={() => removeSizeCount(i)} />
          </div>
        ))}
        <Button text="Добавить размер" onClick={addSizeCount} />
      </div>
      <div className="files">
        <Input
          text="Первое фото"
          type="file"
          setValue={setMainPhoto}
          file={true}
        />
        <Input text="Второе фото" type="file" setValue={setTwo} file={true} />
        <Input text="Третье фото" type="file" setValue={setThree} file={true} />
        <Input
          text="Четвертое фото"
          type="file"
          setValue={setFour}
          file={true}
        />
        <Input text="Пятое фото" type="file" setValue={setFive} file={true} />
        <Input text="Шестое фото" type="file" setValue={setSix} file={true} />
      </div>
      <Button text="Добавить кроссовки" onClick={addNewSneakers} />
    </div>
  );
}

export default NewSneakers;
