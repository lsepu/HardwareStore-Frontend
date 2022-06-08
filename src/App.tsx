import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { stateType } from "./state/store";
import HardwareStore from "./HardwareStore";

function App() {
  const user = useSelector((state: stateType) => state.user.user);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/store" element={<HardwareStore />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="*"
            element={
              <div>
                <h2>404 Page not found</h2>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
