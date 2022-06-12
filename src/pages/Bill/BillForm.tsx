import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import Header from "../../components/Header";
import { createBill, updateProduct } from "../../state/actions";
import { IBill, IProductOrder } from "../../state/features/BillSlice";
import { IProduct } from "../../state/features/productSlice";
import { AppDispatch, stateType } from "../../state/store";

const BillForm = () => {
  const products = useSelector((state: stateType) => state.product.products);
  const user = useSelector((state: stateType) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  //trigger alert if its going to be less than the minimum
  const [alertTrigger, setAlertTrigger] = useState<boolean>(false);

  //create cart of products that is going to be in the bill
  const [cart, setCart] = useState<IProductOrder[]>([]);

  //handle client name info
  const [clientName, setClientName] = useState("");

  const [checked, setChecked] = useState(
    new Array(products.length).fill(false)
  );

  const handleChecked = (position: number) => {
    const updatedProductsChecked = checked.map((checkedState, index) =>
      index === position ? !checkedState : checkedState
    );
    setChecked(updatedProductsChecked);
  };

  const verifyChecked = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    product: IProduct,
    position: number
  ) => {
    handleChecked(position);

    //add to cart with initial values
    if (e.currentTarget.checked) {
      const productOrder = {
        name: product.name,
        amount: 1,
        total: product.price,
      };
      addToCart(productOrder);
    } else {
      removeFromCart(product.name);
    }
  };

  const addToCart = (productOrder: IProductOrder) => {
    setCart([...cart, productOrder]);
  };

  const removeFromCart = (productName: string) => {
    setCart(cart.filter((product) => product.name !== productName));
  };

  //When I start adding products it is going to update the cart
  const updateCartAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    product: IProduct
  ) => {
    const amount = e.target.valueAsNumber;

    //check to set alert
    product.quantity - amount < product.minUnits
      ? setAlertTrigger(true)
      : setAlertTrigger(false);

    const productOrderUpdated = {
      name: product.name,
      amount: amount,
      total: product.price * amount,
    };

    const updatedCart = cart.map((order, index) =>
      order.name === product.name ? productOrderUpdated : order
    );

    setCart(updatedCart);
  };

  const generateBill = () => {
    if (cart.length > 0 && clientName) {
      const salesPersonName = user.displayName ? user.displayName : user.email;

      const bill: IBill = {
        date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
        clientName: clientName,
        salesPersonName: salesPersonName,
        products: cart,
      };

      //update quantity for products in cart in the backend
      products.forEach((product) => {
        cart.forEach((productOrder) => {
          product.name == productOrder.name && dispatch(updateProduct({...product, quantity: product.quantity - productOrder.amount}))
        })
      });

      //bill creation in backend
      dispatch(createBill(bill));
      
      alert("The bill was successfully generated");
      navigate("/bills");
    } else {
      alert("Your bill can't be generated");
    }
  };

  return (
    <div>
      <Header />

      {alertTrigger && (
        <Alert
          message={
            "If you sell this amount the product quantity is going to be less than the minimum"
          }
        />
      )}

      <h1 className="tab-title">Generate bill</h1>
      <div className="container">
        <div className="table-wrapper">
          <table className="striped highlight table-styling centered">
            <thead>
              <tr>
                <th>Add to cart</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  {product.quantity > 0 && (
                    <>
                      <td>
                        <p>
                          <label>
                            <input
                              type="checkbox"
                              className="filled-in"
                              onClick={(e) => verifyChecked(e, product, index)}
                            />
                            <span>Add</span>
                          </label>
                        </p>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        {checked[index] && (
                          <input
                            style={{ width: "200px" }}
                            min="1"
                            max={product.quantity}
                            type="number"
                            name="amount"
                            onChange={(e) => updateCartAmount(e, product)}
                          />
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row">
          <div className="col s12">
            <div className="input-field col s6">
              <input
                value={clientName}
                name="name"
                onChange={(e) => setClientName(e.target.value)}
                type="text"
              />
              <label>Client name</label>
            </div>
            <div className="input-field col s6">
              <button onClick={generateBill} className="blue darken-1 btn">
                Generate bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillForm;
