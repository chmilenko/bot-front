import { Route, Routes } from "react-router-dom";
import Home from "../Features/Home/Home";
import "../Styles/main.scss";
import ModelInfo from "../Features/ModelInfo/ModelInfo";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route element={<ModelInfo/>} path="/models/:id" />
    </Routes>
  );
}

export default App;
