import { useState } from "react";

import TableSneakers from "@Components/Admin/Sneakers/Table/TableSneaker";
import Button from "@Ui/Button/Button";
import Input from "@Ui/Input/Input";
import SelectComponent from "../../../../UI/Select/Select";
import Modal from "@Components/Modal/Modal";
import NewSneakers from "@Components/Admin/Sneakers/NewSneakers/NewSneakers";
import useSize from "../../../../Core/Store/size";
import useModels from "../../../../Core/Store/models";
import "./sneaker.scss";

function Sneakers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const { sizes } = useSize();
  const { allModels } = useModels();

  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
  const [priceFromFilter, setPriceFromFilter] = useState("");
  const [priceToFilter, setPriceToFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState([]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const filtersOpen = () => {
    setOpenFilter(!openFilter);
  };

  const applyFilters = () => {
    return allModels.filter((sneaker) => {
      const matchesBrand = brandFilter
        ? sneaker?.mark?.toLowerCase().includes(brandFilter.toLowerCase())
        : true;
      const matchesModel = modelFilter
        ? sneaker.name.toLowerCase().includes(modelFilter.toLowerCase())
        : true;
      const matchesPriceFrom = priceFromFilter
        ? Number(sneaker.price) >= Number(priceFromFilter)
        : true;
      const matchesPriceTo = priceToFilter
        ? Number(sneaker.price) <= Number(priceToFilter)
        : true;
      const matchesSize = sizeFilter.length
        ? sizeFilter.some((size) =>
            sneaker.sizes.some((s) => Number(s.size) === Number(size))
          )
        : true;
      return (
        matchesBrand &&
        matchesModel &&
        matchesPriceFrom &&
        matchesPriceTo &&
        matchesSize
      );
    });
  };

  const filteredModels = applyFilters();

  return (
    <div className="container_sneakers">
      <div className="core_sneakers">
        <Button text="Фильтры" onClick={filtersOpen} />
        <Button text="Создать новую пару" onClick={toggleModal} />
      </div>
      {openFilter && (
        <div className="filters">
          <Input
            text="По бренду"
            value={brandFilter}
            setValue={setBrandFilter}
          />
          <Input
            text="По модели"
            value={modelFilter}
            setValue={setModelFilter}
          />
          <Input
            text="По цене от"
            value={priceFromFilter}
            setValue={setPriceFromFilter}
          />
          <Input
            text="По цене до"
            value={priceToFilter}
            setValue={setPriceToFilter}
          />
          <SelectComponent
            label="По размеру"
            options={sizes}
            value={sizeFilter}
            setValue={setSizeFilter}
            name="size"
            multiple
          />
        </div>
      )}
      <div className="table_sneakers">
        <TableSneakers models={filteredModels} />
      </div>
      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={toggleModal}>
          <Button onClick={toggleModal} text="Закрыть" />
          <NewSneakers />
        </Modal>
      )}
    </div>
  );
}

export default Sneakers;
