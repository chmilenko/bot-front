import Table from "@Components/Table/Table";
import useModels from "@Core/Store/models";
import { useNavigate } from "react-router-dom";

function TableSneakers() {
  const { allModels } = useModels();

  const navigate = useNavigate();
  console.log(allModels);
  const tableBody = allModels?.map((sneaker) => (
    <tr
      key={sneaker.id}
      onClick={() => navigate(`/admin/model/${String(sneaker.id)}`)}
    >
      <td>{sneaker.id}</td>
      <td>{sneaker?.Mark?.name}</td>
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
