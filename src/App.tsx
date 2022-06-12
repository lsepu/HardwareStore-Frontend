import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, stateType } from "./state/store";
import AddProduct from "./pages/Product/AddProduct";
import Stock from "./pages/Product/Stock";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./state/features/userSlice";
import { auth } from "./firebase";
import Providers from "./pages/Provider/Providers";
import AddProvider from "./pages/Provider/AddProvider";
import BuyProduct from "./pages/Product/RequestProduct";
import Receipts from "./pages/Product/Receipts";
import BillForm from "./pages/Bill/BillForm";
import Bills from "./pages/Bill/Bills";
import { getBills, getProducts, getProviders, getReceipts } from "./state/actions";

function App() {
  const user = useSelector((state: stateType) => state.user.user);
  const products = useSelector((state: stateType) => state.product.products);

  const dispatch = useDispatch<AppDispatch>();
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

    ///check products
    useEffect(() => {
      dispatch(getProducts());
    }, [dispatch]);
  
    //check providers
    useEffect(() => {
      dispatch(getProviders());
    }, [dispatch]);
  
    //check bills
    useEffect(() => {
      dispatch(getBills());
    }, [dispatch]);
  
    //check receipts
    useEffect(() => {
      dispatch(getReceipts());
    }, [dispatch]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/providers" element={<Providers />} />
          <Route path="/add-provider" element={<AddProvider />} />
          <Route path="/buy-product" element={<BuyProduct />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/generate-bill" element={<BillForm />} />
          <Route path="/bills" element={<Bills />} />
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
