import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./admin.scss";

import Sneakers from "./Components/SneakersPage.jsx/Sneakers";
import Orders from "./Components/OrdersPage/Orders";

import Button from "../../UI/Button/Button";

import Api from "@Core/Api/api";
import useModels from "@Core/Store/models";
import useSize from "../../Core/Store/size";
import useAdminStore from "../../Core/Store/admin";

function AdminPage() {
  const { deleteUser } = useAdminStore();
  const { setAllModels } = useModels();
  const { setSizes } = useSize();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const navigate = useNavigate();
  const [page, setPage] = useState("sneakers");

  const handleSetPage = (name) => {
    setPage(name);
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await Api.checkToken(cookies.token);
        if (res.data.valid) {
          Api.getAllSneakers()
            .then((res) => setAllModels(res.data))
            .catch((error) => console.log(error));
          Api.getSizes().then((res) => setSizes(res)).catch((error) => console.log(error));
        } else {
          navigate("/auth");
        }
      } catch (error) {
        console.error("Failed to check token", error);
        navigate("/auth");
      }
    };

    if (cookies.token) {
      checkToken();
    } else {
      navigate("/auth");
    }
  }, [cookies.token, navigate, setAllModels]);

  const logout = () => {
    deleteUser();
    removeCookie("token");
    navigate("/auth");
  };

  return (
    <div className="container">
      <div className="set_page">
        <Button onClick={() => handleSetPage("sneakers")} text="Кроссовки" />
        <Button onClick={() => handleSetPage("orders")} text="Заказы" />
        <Button onClick={() => logout()} text="Выйти" />
      </div>
      <div className="content">
        {page === "sneakers" && <Sneakers />}
        {page === "orders" && <Orders />}
      </div>
    </div>
  );
}

export default AdminPage;
