import React, { useState } from "react";
import "./Auth.scss";
import Input from "@Ui/Input/Input";
import Button from "../../UI/Button/Button";
import Api from "../../Core/Api/api";
import { useCookies } from "react-cookie";
import useAdminStore from "../../Core/Store/admin";
import { useNavigate } from "react-router-dom";

function Auth() {
  const { user, setUser } = useAdminStore();
  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  // Используем состояние из Zustand store
  const handleClickAuthenication = async () => {
    const data = {
      login: user.login,
      password: user.password,
    };

    try {
      const res = await Api.authenication(data);
      if (res.status === 201) {
        setCookie("token", res.data.token);
        setUser({ auth: true }); // Обновляем статус авторизации
        navigate("/admin");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Authentication failed", error);
      setError(true);
    }
  };

  return (
    <div className="container">
      <h3 className="container-title">Добро пожаловать работяга!</h3>
      <div className="container-inputs">
        <Input
          text="Логин"
          value={user.login}
          setValue={(value) => setUser({ login: value })}
        />
        <Input
          text="Пароль"
          value={user.password}
          setValue={(value) => setUser({ password: value })}
          type="password"
        />
      </div>
      <Button text="Войти" onClick={handleClickAuthenication} />
      {error && <p className="error">Неверные учетные данные</p>}
    </div>
  );
}

export default Auth;
