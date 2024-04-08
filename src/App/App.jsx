import { Route, Routes } from "react-router-dom";
import Home from "../Features/Home/Home";
import "../Styles/main.scss";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" />
    </Routes>
  );
}

export default App;
