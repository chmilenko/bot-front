import useOrder from "@Core/Store/order";
import "./TableSneakers.scss";
import Table from "@Components/Table/Table";
import Combined from "../../../../UI/InputSelect/Combined";
import useStatus from "../../../../Core/Store/status";
import { useState } from "react";
import Api from "../../../../Core/Api/api";

function TableOrders({ setOpen, handleStatusChange }) {
  const { orders } = useOrder();
  const { statuses, changeStatusData, setChangeStatusData } = useStatus();
  // const [statusValues, setStatusValues] = useState({});

  const tableHeaders = [
    { name: "ID" },
    { name: "User" },
    { name: "Бренд" },
    { name: "Модель" },
    { name: "Размеры и кол-во" },
    { name: "Cтатус" },
  ];
  // const changeStatus = Api.changeStatus(data);
  const onStatusChange = (orderId, newStatusId) => {
    handleStatusChange(orderId, newStatusId); // Вызов функции из родительского компонента
  };
  const confirmModalOpen = () => {
    setOpen((prev) => !prev);
  };
  // const onStatusChange = (orderId, newStatusId) => {
  //   onStatusChange(orderId, newStatusId); // Вызов функции из родительского компонента
  // };
  const tableBody = orders?.map((order) => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order?.user}</td>
      {order.OrderItems?.map((item) => (
        <>
          <td>{item.mark}</td>
          <td>{item.name}</td>
          {item.sizeCounts.map((size) => (
            <td className="sizes_count" key={size.id}>
              <td className="size">{size.size}</td>
              <td className="count">{size.count}</td>
            </td>
          ))}
        </>
      ))}
      <td className="status-container">
        <div className="set-status">
          <Combined
            options={statuses}
            value={order.status} // Используем id статуса как value
            setValue={(newStatusId) =>
              handleStatusChange(order.id, newStatusId)
            }
          />
        </div>
      </td>
    </tr>
  ));

  return <Table thead={tableHeaders} tbody={tableBody} />;
}

export default TableOrders;
