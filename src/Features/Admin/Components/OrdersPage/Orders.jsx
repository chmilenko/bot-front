import { useEffect } from "react";

import useOrder from "@Core/Store/order";
import Api from "@Core/Api/api";
import TableOrders from "@Components/Admin/Orders/Table/TableOrders";

function Orders() {
  const { setOrders } = useOrder();

  useEffect(() => {
    Api.getOrders().then((res) => setOrders(res.data));
  }, [setOrders]);

  return <TableOrders />;
}

export default Orders;
