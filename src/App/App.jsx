import { Route, Routes } from "react-router-dom";
import Home from "../Features/Home/Home";
import "../Styles/main.scss";
import ModelInfo from "../Features/ModelInfo/ModelInfo";
import AdminPage from "../Features/Admin/AdminPage";
import ModelAdmin from "../Features/Admin/Components/ModelAdmin/ModelAdmin";
import Auth from "../Features/Auth/Auth";
import { useCookies } from "react-cookie";
import useAdminStore from "../Core/Store/admin";

function App() {
  // const [cookies] = useCookies();
  const { user } = useAdminStore();
  console.log(user);
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<ModelInfo />} path="/models/:id" />
      <Route element={<Auth />} path="/auth" />
      <Route element={<AdminPage />} path="/admin" />
      <Route element={<ModelAdmin />} path="/admin/model/:id" />
    </Routes>
  );
}

export default App;
