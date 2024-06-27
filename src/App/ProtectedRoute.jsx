import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAdminStore from "../Core/Store/admin";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { user, setUser } = useAdminStore();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token && !user.auth) {
      // Проверяем токен, если он есть, но auth: false
      const checkToken = async () => {
        try {
          const res = await Api.checkToken(cookies.token);
          if (res.data.valid) {
            setUser({ auth: true });
          } else {
            return <Navigate to="/auth" />;
          }
        } catch (error) {
          console.error("Failed to check token", error);
          return <Navigate to="/auth" />;
        }
      };
      checkToken();
    }
  }, [cookies.token, setUser, user.auth]);

  if (!user.auth || !cookies.token) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
