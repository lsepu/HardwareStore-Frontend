import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { stateType } from "../state/store";

const AddProduct = () => {
  const providers = useSelector((state: stateType) => state.provider.providers);

  const [productInput, setProductInput] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    minUnits: "",
    maxUnits: "",
    provider: {},
  });

  const [providerInput, setProviderInput] = useState({});

  const addNewProduct = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(productInput);
  };

  const clearProductInput = () => {
    setProductInput({
      name: "",
      description: "",
      price: "",
      quantity: "",
      minUnits: "",
      maxUnits: "",
      provider: {},
    });
  };

  const setProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductInput({
      ...productInput,
      [e.target.name]: [e.target.value],
    });
  };

  const setProvider = (
    e: React.ChangeEvent<HTMLInputElement>,
    provider: any
  ) => {
    setProductInput({
      ...productInput,
      provider: provider,
    });
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
                <input
                  value={productInput.name}
                  name="name"
                  onChange={setProduct}
                  type="text"
                />
                <label>Product name</label>
              </div>
              <div className="input-field col s6">
                <input
                  value={productInput.description}
                  type="text"
                  name="description"
                  onChange={setProduct}
                />
                <label>Description</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={productInput.price}
                  type="text"
                  name="price"
                  onChange={setProduct}
                />
                <label>Price</label>
              </div>
              <div className="input-field col s6">
                <input
                  value={productInput.quantity}
                  type="text"
                  name="quantity"
                  onChange={setProduct}
                />
                <label>Quantity</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={productInput.minUnits}
                  type="text"
                  name="minUnits"
                  onChange={setProduct}
                />
                <label>Minimum units</label>
              </div>
              <div className="input-field col s6">
                <input
                  value={productInput.maxUnits}
                  type="text"
                  name="maxUnits"
                  onChange={setProduct}
                />
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
                        <input
                          name={provider.idCard}
                          type="radio"
                          checked={providerInput === provider}
                          onChange={(e) => setProvider(e, provider)}
                        />
                        <span style={{ fontWeight: "700" }}>
                          {provider.name}
                        </span>
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
