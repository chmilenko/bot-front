import useOrder from "@Core/Store/order";
import "./TableOrders.scss";
import Table from "@Components/Table/Table";
import Combined from "@Ui/InputSelect/Combined";
import useStatus from "@Core/Store/status";

// eslint-disable-next-line react/prop-types
function TableOrders({ handleStatusChange }) {
  const { orders } = useOrder();
  const { statuses } = useStatus();
  // const [statusValues, setStatusValues] = useState({});

  const tableHeaders = [
    { name: "ID" },
    { name: "User" },
    { name: "Бренд" },
    { name: "Модель" },
    { name: "Размеры и кол-во" },
    { name: "Доставка" },
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
          <td>
            {item.sizeCounts.map((size) => (
              <div
                className="sizes_count"
                key={size.id}
                style={{ height: "100%" }}
              >
                <div
                  className="size"
                  style={{ borderRight: "1px solid rgb(126, 122, 122)" }}
                >
                  {size.size}
                </div>
                <div className="count">{size.count}</div>
              </div>
            ))}
          </td>
        </>
      ))}
      <td>
        <div className="delivery-info">
          <div className="delivery-info-child">
            <span className="delivery-info-child-title"> Тип:</span>
            <p className="delivery-info-child-info">
              {order.deliveryInfo.type}
            </p>
          </div>
          {order.deliveryInfo.phone && (
            <div className="delivery-info-child">
              <span className="delivery-info-child-title">Телефон:</span>
              <p className="delivery-info-child-info">
                {order.deliveryInfo.phone}
              </p>
            </div>
          )}
          {order.deliveryInfo.address && (
            <div className="delivery-info-child">
              <span className="delivery-info-child-title">Адрес:</span>
              <p className="delivery-info-child-info">
                {order.deliveryInfo.address}
              </p>
            </div>
          )}
          {order.deliveryInfo.fullName && (
            <div className="delivery-info-child">
              <span className="delivery-info-child-title">Имя:</span>
              <p className="delivery-info-child-info">
                {order.deliveryInfo.fullName}
              </p>
            </div>
          )}
        </div>
      </td>
      <td className="status-container">
        <div className="set-status">
          <Combined
            options={statuses}
            value={order.status}
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
