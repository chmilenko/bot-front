import TableSneakers from "@Components/Admin/Sneakers/Table/TableSneaker";
import Button from "@Ui/Button/Button";

import "./sneaker.scss";
import { useState } from "react";
import Modal from "../../../../Components/Modal/Modal";
import NewSneakers from "../../../../Components/Admin/Sneakers/NewSneakers/NewSneakers";

function Sneakers() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="container_sneakers">
      <div className="core_sneakers">
        <Button text="Фильтры" />
        <Button text="Создать новую пару" onClick={toggleModal} />
      </div>
      <div className="table_sneakers">
        <TableSneakers />
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
