import { Route, Routes } from "react-router-dom";
import Home from "../Features/Home/Home";
import "../Styles/main.scss";
import ModelInfo from "../Features/ModelInfo/ModelInfo";
import AdminPage from "../Features/Admin/AdminPage";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<ModelInfo />} path="/models/:id" />
      <Route element={<AdminPage />} path="/admin" />
    </Routes>
  );
}

export default App;
