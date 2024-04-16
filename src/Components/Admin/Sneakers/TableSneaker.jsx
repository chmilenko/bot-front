import Table from "@Components/Table/Table";
import useModels from "@Core/Store/models";

// import "./Styles/table.scss";

function TableSneakers() {
  const { allModels } = useModels();

  const tableBody = allModels?.map((sneaker) => (
    <tr key={sneaker.id}>
      <td>{sneaker.id}</td>
      <td>{sneaker?.Mark?.name}</td>
      <td>{sneaker.name}</td>
      <td>
        {/* Парсинг данных для столбца "Размеры и кол-во" */}
        {sneaker.Sizes.map((size) => (
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
