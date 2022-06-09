import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { addProvider } from "../state/actions";

const AddProvider = () => {
  const dispatch = useDispatch();

  const [providerInput, setProviderInput] = useState({
    name: "",
    idCard: "",
    phoneNumber: "",
  });

  const addNewProvider = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      providerInput.name != "" &&
      providerInput.idCard != "" &&
      providerInput.phoneNumber != ""
    ) {
      const providerToAdd = {
        name: providerInput.name.toString(),
        idCard: providerInput.idCard.toString(),
        phoneNumber: providerInput.phoneNumber.toString(),
      };
      dispatch(addProvider(providerToAdd));
      clearProviderInput();
      alert("Provider succesfully added");
    } else {
      alert("Please don't leave empty fields");
    }
  };

  const setProvider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProviderInput({
      ...providerInput,
      [e.target.name]: [e.target.value],
    });
  };

  const clearProviderInput = () => {
    setProviderInput({
      name: "",
      idCard: "",
      phoneNumber: "",
    });
  };

  return (
    <div>
      <Header />

      <h1 className="tab-title">Add provider</h1>

      <div className="container">
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={providerInput.name}
                  name="name"
                  onChange={setProvider}
                  type="text"
                />
                <label>Provider name</label>
              </div>
              <div className="input-field col s6">
                <input
                  value={providerInput.idCard}
                  type="text"
                  name="idCard"
                  onChange={setProvider}
                />
                <label>identification</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  value={providerInput.phoneNumber}
                  type="text"
                  name="phoneNumber"
                  onChange={setProvider}
                />
                <label>Phone number</label>
              </div>
              <div className="input-field col s6">
                <button onClick={addNewProvider} className="blue darken-1 btn">
                  Add provider
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProvider;
