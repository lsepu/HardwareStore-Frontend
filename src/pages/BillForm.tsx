import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { IProduct } from "../state/features/productSlice";
import { stateType } from "../state/store";

const BillForm = () => {
  const products = useSelector((state: stateType) => state.product.products);

  const [cart, setCart] = useState<IProduct[]>([]);

  const [clientName, setClientName] = useState("");

  const verifyChecked = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    product: IProduct
  ) => {
    if (e.currentTarget.checked) {
      addToCart(product);
    } else {
      removeFromCart(product);
    }
  };

  const addToCart = (product: IProduct) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (product: IProduct) => {
    setCart(cart.filter((p) => p.id !== product.id));
  };

  const generateBill = () => {
    if (cart.length > 0 && clientName) {
      console.log(clientName);
      console.log(cart);
    } else{
      alert("Your bill can't be generated")
    }
  };

  return (
    <div>
      <Header />
      <h1 className="tab-title">Product Stock</h1>
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
              {products.map((product) => (
                <tr key={product.id}>
                  {product.quantity > 0 && (
                    <>
                      <td>
                        <p>
                          <label>
                            <input
                              type="checkbox"
                              className="filled-in"
                              onClick={(e) => verifyChecked(e, product)}
                            />
                            <span>Add</span>
                          </label>
                        </p>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>
                        <input
                          style={{ width: "200px" }}
                          min="1"
                          max={product.quantity}
                          type="number"
                          name="quantity"
                        />
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
