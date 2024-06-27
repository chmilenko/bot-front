import Table from "@Components/Table/Table";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function TableSneakers({ models }) {
  const navigate = useNavigate();

  // eslint-disable-next-line react/prop-types
  const tableBody = models?.map((sneaker) => (
    <tr
      key={sneaker.id}
      onClick={() => navigate(`/admin/model/${String(sneaker.id)}`)}
    >
      <td>{sneaker.id}</td>
      <td>{sneaker?.mark}</td>
      <td>{sneaker.name}</td>
      <td>
        {sneaker.sizes.map((size) => (
          <div className="sizes_count" key={size.id}>
            <td className="size">{size.size}</td>
            <td className="count">{size.count}</td>
          </div>
        ))}
      </td>
      <td>{sneaker.price}</td>
    </tr>
  ));

  const tableHeaders = [
    { name: "ID" },
    { name: "Бренд" },
    { name: "Модель" },
    { name: "Размеры и кол-во" },
    { name: "Цена" },
  ];

  return <Table thead={tableHeaders} tbody={tableBody} />;
}

export default TableSneakers;
