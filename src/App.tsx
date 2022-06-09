import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { stateType } from "./state/store";
import AddProduct from "./pages/AddProduct";
import Stock from "./pages/Stock";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./state/features/userSlice";
import { auth } from "./firebase";
import { getProducts } from "./state/actions";
import Providers from "./pages/Providers";
import AddProvider from "./pages/AddProvider";

function App() {
  const user = useSelector((state: stateType) => state.user.user);
  const products = useSelector((state: stateType) => state.product.products);


  const dispatch = useDispatch();
  // check at page load if a user is authenticated
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            //uid: userAuth.uid,
            displayName: userAuth.displayName,
            //photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  //check products
  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/add-provider" element={<AddProvider />} ></Route>
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
