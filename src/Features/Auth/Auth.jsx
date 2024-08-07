import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import "./Auth.scss";

import Input from "@Ui/Input/Input";
import Button from "@Ui/Button/Button";

import Api from "../../Core/Api/api";
import useAdminStore from "../../Core/Store/admin";

function Auth() {
  const { user, setUser } = useAdminStore();
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");

  const [cookies, setCookie] = useCookies(["token"]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleClickAuthenication = async () => {
    const data = {
      login,
      password,
    };

    try {
      const res = await Api.authenication(data);
      if (res.status === 201) {
        setCookie("token", res.data.token);
        setUser({ ...user, auth: true }); // Устанавливаем auth: true
        navigate("/admin");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Authentication failed", error);
      setError(true);
    }
  };

  useEffect(() => {
    if (user.auth && cookies.token) {
      navigate("/admin");
    }
  }, [cookies.token, navigate, user.auth]);

  return (
    <div className="container">
      <h3 className="container-title">Добро пожаловать работяга!</h3>
      <div className="container-inputs">
        <Input text="Логин" value={login} setValue={setLogin} />
        <Input
          text="Пароль"
          value={password}
          setValue={setPassword}
          type="password"
        />
      </div>
      <Button text="Войти" onClick={handleClickAuthenication} />
      {error && <p className="error">Неверные учетные данные</p>}
    </div>
  );
}

export default Auth;
