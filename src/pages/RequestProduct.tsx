import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import Header from "../components/Header";
import { createReceipt } from "../state/actions";
import { IProduct } from "../state/features/productSlice";
import { IRecepit } from "../state/features/receiptSlice";
import { AppDispatch, stateType } from "../state/store";

interface IProductQuantityInfo {
  currentQuantity: number;
  maxUnits: number;
}

const BuyProduct = () => {
  const products = useSelector((state: stateType) => state.product.products);
  const dispatch = useDispatch<AppDispatch>();

  const [alertTrigger, setAlertTrigger] = useState<boolean>(false);

  const [receipt, setReceipt] = useState<IRecepit>({
    date: "",
    providerName: "",
    productName: "",
    quantity: 0,
  });

  const [productQuantityInfo, setProductQuantityInfo] =
    useState<IProductQuantityInfo>({
      currentQuantity: 0,
      maxUnits: 0,
    });

  const getProductToRequest = (product: IProduct) => {
    //create initial order
    const order: IRecepit = {
      date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
      productName: product.name,
      providerName: product.provider.name,
      quantity: 1,
    };

    //get the product maximum
    setProductQuantityInfo({
      currentQuantity: product.quantity,
      maxUnits: product.maxUnits,
    });

    setReceipt(order);
  };

  const clearRequest = () => {
    setReceipt({
      date: "",
      providerName: "",
      productName: "",
      quantity: 1,
    });
  };

  const setProductQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    //set alertTrigger if its greater than the maximum number of units
    parseInt(e.target.value) + productQuantityInfo.currentQuantity >
    productQuantityInfo.maxUnits
      ? setAlertTrigger(true)
      : setAlertTrigger(false);

    //increment or decrement product quantity
    setReceipt({
      ...receipt,
      quantity: parseInt(e.target.value),
    });
  };

  const RequestProduct = () => {
    dispatch(createReceipt(receipt));
    alert("Product successfully requested");

    //clear states
    setAlertTrigger(false);
    setReceipt({
      date: "",
      providerName: "",
      productName: "",
      quantity: 0,
    });
  };

  return (
    <div>
      <Header />

      {alertTrigger && (
        <Alert
          message={"You are exceding the maximum amount of this product"}
        />
      )}

      <h1 className="tab-title">Request products</h1>
      <div className="container">
        <div className="table-wrapper">
          <table className="striped highlight table-styling centered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Provider</th>
                <th>Request?</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.provider.name}</td>
                  <td>
                    <a
                      onClick={() => getProductToRequest(product)}
                      className="blue darken-1 btn"
                    >
                      Request product
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {receipt.date !== "" && (
          <>
            <table className="striped highlight table-styling centered">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Request</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{receipt.productName}</td>
                  <td>
                    <input
                      style={{ width: "200px" }}
                      min="1"
                      type="number"
                      name="quantity"
                      value={receipt.quantity}
                      onChange={setProductQuantity}
                    />
                  </td>
                  <td>
                    <a onClick={RequestProduct} className="blue darken-1 btn">
                      Request
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>

            <a
              style={{ marginTop: "25px" }}
              onClick={clearRequest}
              className="red btn"
            >
              Close
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default BuyProduct;
