import { useEffect, useState } from "react";

import useOrder from "@Core/Store/order";
import useStatus from "@Core/Store/status";
import Api from "@Core/Api/api";
import TableOrders from "@Components/Admin/Orders/Table/TableOrders";
import Modal from "@Components/Modal/Modal";
import Button from "../../../../UI/Button/Button";
function Orders() {
  const { setOrders } = useOrder();
  const { setStatuses, changeStatusData, setChangeStatusData } = useStatus();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    Api.getOrders().then((res) => setOrders(res.data));
    Api.getStatuses().then((res) => setStatuses(res.data));
  }, [setOrders, setStatuses]);

  const handleStatusChange = (orderId, statusId) => {
    setChangeStatusData(orderId, statusId);
    setOpen(true);
  };
  const handleConfirmStatusChange = () => {
    Api.changeStatus(changeStatusData).then((res) => {
      Api.getOrders().then((res) => setOrders(res.data));
      setOpen(false);
    });
  };
  return (
    <>
      <TableOrders setOpen={setOpen} handleStatusChange={handleStatusChange} />
      {open && (
        <Modal isOpen={open} style={{ width: 500, height: 500 }}>
          <div>
            <Button onClick={() => setOpen(false)} text="Закрыть" />
            <div className="actions">
              <Button text="Отменить" />
              <Button
                text="Изменить статус"
                onClick={handleConfirmStatusChange}
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Orders;
