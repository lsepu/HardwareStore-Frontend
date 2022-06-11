import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  getBills,
  getProducts,
  getProviders,
  getReceipts,
} from "../state/actions";
import { login, logout } from "../state/features/userSlice";
import { AppDispatch, stateType } from "../state/store";

const Header = () => {
  const user = useSelector((state: stateType) => state.user.user);

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  //check if it's not logged in
  useEffect(() => {
    if (user.email === "") {
      navigate("/login");
    }
  }, [user]);

  const logoutUser = async () => {
    await signOut(auth);
  };

  //show or hide dropdown options
  const [showNavbarProduct, setShowNavbarProduct] = useState(false);
  const [showNavbarProvider, setShowNavbarProvider] = useState(false);
  const [showNavbarBill, setShowNavbarBill] = useState(false);

  //show tabs
  const toggleProviderNavbar = () => {
    showNavbarProduct && setShowNavbarProduct(false);
    showNavbarBill && setShowNavbarBill(false);
    setShowNavbarProvider(!showNavbarProvider);
  };

  const toggleProductNavbar = () => {
    showNavbarProvider && setShowNavbarProvider(false);
    showNavbarBill && setShowNavbarBill(false);
    setShowNavbarProduct(!showNavbarProduct);
  };

  const toggleBillNavbar = () => {
    showNavbarProduct && setShowNavbarProduct(false);
    showNavbarProvider && setShowNavbarProvider(false);
    setShowNavbarBill(!showNavbarBill);
  };

  return (
    <>
      <nav className="nav-extended">
        <div className="nav-wrapper red accent-2">
          <a className="brand-logo left" style={{ paddingLeft: "15px" }}>
            Hardware store Administration
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a onClick={toggleBillNavbar}>
                Bill<i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>

            <li>
              <a onClick={toggleProviderNavbar}>
                Providers<i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>

            <li>
              <a onClick={toggleProductNavbar}>
                Products<i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>
            <li
              style={{
                fontWeight: "bold",
                paddingLeft: "20px",
                fontSize: "18px",
              }}
            >
              {user.displayName ? user.displayName : user.email}
            </li>
            <li>
              <a onClick={logoutUser} className=" blue darken-1 btn">
                Logout
              </a>
            </li>
          </ul>
        </div>

        {showNavbarProduct && (
          <div id="subMenu-Product" className="nav-content">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <Link to="/add-product" className="subtab-text">
                  Add new product
                </Link>
              </li>
              <li className="tab">
                <Link to="/stock" className="subtab-text">
                  Check Stock
                </Link>
              </li>
              <li className="tab">
                <Link to="/buy-product" className="subtab-text">
                  Request products
                </Link>
              </li>
              <li className="tab">
                <Link to="/receipts" className="subtab-text">
                  Receipts
                </Link>
              </li>
            </ul>
          </div>
        )}

        {showNavbarProvider && (
          <div id="subMenu-Product" className="nav-content">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <Link to="/add-provider" className="subtab-text">
                  Add new provider
                </Link>
              </li>
              <li className="tab">
                <Link to="/providers" className="subtab-text">
                  Check providers
                </Link>
              </li>
            </ul>
          </div>
        )}

        {showNavbarBill && (
          <div id="subMenu-Product" className="nav-content">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <Link to="/generate-bill" className="subtab-text">
                  Generate Bill
                </Link>
              </li>
              <li className="tab">
                <Link to="/bills" className="subtab-text">
                  Check bills
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
