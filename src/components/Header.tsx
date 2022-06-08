import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { login, logout } from "../state/features/userSlice";
import { stateType } from "../state/store";

const Header = () => {
  const user = useSelector((state: stateType) => state.user.user);
  //console.log(user);

  const navigate = useNavigate();

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
        navigate("/store");
      } else {
        dispatch(logout());
        navigate("/login");
      }
    });
  }, []);

  const logoutUser = async () => {
    await signOut(auth);
  };

  //show or hide dropdown options
  const [showNavbarProduct, setShowNavbarProduct] = useState(false);
  const [showNavbarProvider, setShowNavbarProvider] = useState(false);

  return (
    <>
      <nav className="nav-extended">
        <div className="nav-wrapper red accent-2">
          <a className="brand-logo left" style={{ paddingLeft: "15px" }}>
            Hardware store Administration
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a onClick={() => setShowNavbarProvider(!showNavbarProvider)}>
                Providers<i className="material-icons right">arrow_drop_down</i>
              </a>
            </li>

            <li>
              <a onClick={() => setShowNavbarProduct(!showNavbarProduct)}>
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
              <a onClick={logoutUser} className="waves-effect waves-light btn">
                Logout
              </a>
            </li>
          </ul>
        </div>

        {showNavbarProduct && (
          <div id="subMenu-Product" className="nav-content">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <a  className="subtab-text">Add new product</a>
              </li>
              <li className="tab">
                <a  className="subtab-text">Check Stock</a>
              </li>
            </ul>
          </div>
        )}

        {showNavbarProvider && (
          <div id="subMenu-Product" className="nav-content">
            <ul className="tabs tabs-transparent">
              <li className="tab">
                <a  className="subtab-text">Add new provider</a>
              </li>
              <li className="tab">
                <a className="subtab-text">Check Providers</a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
