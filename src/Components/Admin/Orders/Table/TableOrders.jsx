import useOrder from "@Core/Store/order";

import Table from "@Components/Table/Table";

import { useNavigate } from "react-router-dom";

function TableOrders() {
  const { orders } = useOrder();

  const navigate = useNavigate();

  const tableHeaders = [
    { name: "ID" },
    { name: "User" },
    { name: "Бренд" },
    { name: "Модель" },
    { name: "Размеры и кол-во" },
    // { name: "Цена" },
    { name: "Cтатус" },
  ];

  const tableBody = orders?.map((order) => (
    <tr key={order.id}>
      <td>{order.id}</td>
      <td>{order?.user}</td>
      {order.OrderItems?.map((item) => (
        <>
          <td>{item.mark}</td>
          <td>{item.name}</td>
          {item.sizeCounts.map((size) => (
            <div className="sizes_count" key={size.id}>
              <td className="size">{size.size}</td>
              <td className="count">{size.count}</td>
            </div>
          ))}
        </>
      ))}
      <td>{order.status}</td>
    </tr>
  ));
  return <Table thead={tableHeaders} tbody={tableBody} />;
}

export default TableOrders;
