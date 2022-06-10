import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { createBill } from "../state/actions";
import { IBill, IProductOrder } from "../state/features/BillSlice";
import { IProduct } from "../state/features/productSlice";
import { AppDispatch, stateType } from "../state/store";

const BillForm = () => {
  const products = useSelector((state: stateType) => state.product.products);
  const user = useSelector((state: stateType) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();

  // interface ICart {
  //   product: IProduct,
  //   amount: number
  // }

  const [cart, setCart] = useState<IProductOrder[]>([]);

  const [clientName, setClientName] = useState("");

  const [productsAmount, setProductsAmount] = useState(
    new Array(products.length).fill(1)
  );

  const verifyChecked = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>,
    product: IProduct,
    position: number
  ) => {
    if (e.currentTarget.checked) {
      const productOrder = {
        name: product.name,
        amount: productsAmount[position],
        total: product.price * productsAmount[position],
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

  const handleAmount = (
    e: React.ChangeEvent<HTMLInputElement>,
    position: number,
  ) => {
    const updatedProductsAmount = productsAmount.map((product,index) => index === position ? parseInt(e.target.value) : product);
    setProductsAmount(updatedProductsAmount);
    console.log(updatedProductsAmount);
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

      console.log(bill);
      //dispatch(createBill(bill));

      alert("The bill was successfully generated");
      //clear bill
      setCart([]);
      setProductsAmount(new Array(products.length).fill(1));

    } else {
      alert("Your bill can't be generated");
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
                        <input
                          style={{ width: "200px" }}
                          min="1"
                          max={product.quantity}
                          value={productsAmount[index]}
                          type="number"
                          name="amount"
                          onChange={(e) => handleAmount(e,index)}
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
