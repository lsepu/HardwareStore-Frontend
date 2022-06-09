import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { stateType } from "../state/store";

const AddProduct = () => {
  const providers = useSelector((state: stateType) => state.provider.providers);

  const [productInput, setProductInput] = useState({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    minUnits: 0,
    maxUnits: 0,
    provider: {},
  });

  const addNewProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
  };

  return (
    <>
      <Header />

      <h1 className="tab-title">Add product</h1>

      <div className="container">
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input type="text" className="validate" />
                <label>Product name</label>
              </div>
              <div className="input-field col s6">
                <input type="text" className="validate" />
                <label>Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input type="text" className="validate" />
                <label>Price</label>
              </div>
              <div className="input-field col s6">
                <input type="text" className="validate" />
                <label>Quantity</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input type="text" className="validate" />
                <label>Minimum units</label>
              </div>
              <div className="input-field col s6">
                <input type="text" className="validate" />
                <label>Maximum units</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <div className="col s6">
                  <span style={{ fontSize: "20px", fontWeight: "700" }}>
                    Select a Provider:
                  </span>
                </div>
                <div className="col s6">
                  {providers.map((provider) => (
                    <p>
                      <label>
                        <input name={provider.idCard} type="radio" />
                        <span>{provider.name}</span>
                      </label>
                    </p>
                  ))}
                </div>
              </div>
              <div className="input-field col s6">
                <button onClick={addNewProduct} className="blue darken-1 btn">
                  Add product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
