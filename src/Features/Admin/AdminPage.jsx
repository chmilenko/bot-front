import { useEffect, useState } from "react";
import Sneakers from "./Components/SneakersPage.jsx/Sneakers";
import Orders from "./Components/OrdersPage/Orders";

import "./admin.scss";

import Api from "@Core/Api/api";

import useModels from "@Core/Store/models";

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
        <button
          onClick={() => handleSetPage("sneakers")}
          className="page_button"
        >
          КРОССОВКИ
        </button>
        <button onClick={() => handleSetPage("orders")} className="page_button">
          ЗАКАЗЫ
        </button>
      </div>
      <div>
        {page === "sneakers" && <Sneakers />}
        {page === "orders" && <Orders />}
      </div>
    </div>
  );
}

export default AdminPage;
