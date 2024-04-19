import { useEffect, useState } from "react";
import Sneakers from "./Components/SneakersPage.jsx/Sneakers";
import Orders from "./Components/OrdersPage/Orders";

import "./admin.scss";

import Api from "@Core/Api/api";

import useModels from "@Core/Store/models";
import Button from "../../UI/Button/Button";

function AdminPage() {
  const [page, setPage] = useState("sneakers");

  const { setAllModels } = useModels();

  const handleSetPage = (name) => {
    setPage(name);
  };

  useEffect(() => {
    Api.getAllSneakers()
      .then((res) => setAllModels(res.data))
      .catch((error) => console.log(error));
  }, [setAllModels]);

  return (
    <div className="container">
      <div className="set_page">
        <Button
          onClick={() => handleSetPage("sneakers")}
          text="Кроссовки"
        />
        <Button
          onClick={() => handleSetPage("orders")}
          text="Заказы"
        />
      </div>
      <div>
        {page === "sneakers" && <Sneakers />}
        {page === "orders" && <Orders />}
      </div>
    </div>
  );
}

export default AdminPage;
