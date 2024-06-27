import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import useAdminStore from "../Core/Store/admin";
import { useEffect } from "react";

const AuthRedirect = ({ children }) => {
  const { user, setUser } = useAdminStore();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    if (cookies.token && !user.auth) {
      const checkToken = async () => {
        try {
          const res = await Api.checkToken(cookies.token);
          if (res.data.valid) {
            setUser({ auth: true })
          }
        } catch (error) {
          console.error("Failed to check token", error);
        }
      };
      checkToken();
    }
  }, [cookies.token, setUser, user.auth]);

  if (user.auth && cookies.token) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default AuthRedirect;
