import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  const AuthWrapper = (isAuthenticated: boolean) => {
    return isAuthenticated ? (
      <Navigate to="/store" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={AuthWrapper(false)} />
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
