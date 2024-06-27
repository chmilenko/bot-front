import { useEffect, useState } from "react";
import Sneakers from "./Components/SneakersPage.jsx/Sneakers";
import Orders from "./Components/OrdersPage/Orders";

import "./admin.scss";

import Api from "@Core/Api/api";

import useModels from "@Core/Store/models";
import useAdminStore from "../../Core/Store/admin";
import Button from "../../UI/Button/Button";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [page, setPage] = useState("sneakers");
  const { deleteUser, user } = useAdminStore();
  const { setAllModels } = useModels();
  const [removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const handleSetPage = (name) => {
    setPage(name);
  };

  useEffect(() => {
    if (user.auth) {
      Api.getAllSneakers()
        .then((res) => setAllModels(res.data))
        .catch((error) => console.log(error));
    } else navigate("/auth");
  }, [navigate, setAllModels, user.auth]);

  const logout = () => {
    deleteUser(); // Очистка состояния пользователя в Zustand store
    removeCookie("token"); // Удаление куки с токеном
    navigate("/auth"); // Редирект на страницу авторизации
  };

  return (
    <div className="container">
      <div className="set_page">
        <Button onClick={() => handleSetPage("sneakers")} text="Кроссовки" />
        <Button onClick={() => handleSetPage("orders")} text="Заказы" />
        <Button onClick={() => logout()} text="Выйти" />
      </div>
      <div>
        {page === "sneakers" && <Sneakers />}
        {page === "orders" && <Orders />}
      </div>
    </div>
  );
}

export default AdminPage;
