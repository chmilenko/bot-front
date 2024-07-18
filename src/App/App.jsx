import { Route, Routes } from "react-router-dom";
import Home from "../Features/Home/Home";
import "../Styles/fonts/fonts.scss";
import "../Styles/main.scss";
import ModelInfo from "../Features/ModelInfo/ModelInfo";
import AdminPage from "../Features/Admin/AdminPage";
import ModelAdmin from "../Features/Admin/Components/ModelAdmin/ModelAdmin";
import Auth from "../Features/Auth/Auth";
import ProtectedRoute from "./ProtectedRoute";
import AuthRedirect from "./AuthRedirect";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<ModelInfo />} path="/models/:id" />
      <Route
        element={
          <AuthRedirect>
            <Auth />
          </AuthRedirect>
        }
        path="/auth"
      />
      <Route
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
        path="/admin"
      />
      <Route
        element={
          <ProtectedRoute>
            <ModelAdmin />
          </ProtectedRoute>
        }
        path="/admin/model/:id"
      />
    </Routes>
  );
}

export default App;
