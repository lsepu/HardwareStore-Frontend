import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { deleteProvider } from "../state/actions";
import { stateType } from "../state/store";

const Providers = () => {
    const providers = useSelector((state: stateType) => state.provider.providers);
    //console.log(products);
  
    const dispatch = useDispatch();
  
    const deleteSelectedProvider= (id: string) => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
      );
      if (confirmDelete) {
        dispatch(deleteProvider(id));
      }
    };
  
    return (
      <>
        <Header />
        <h1 className="tab-title">Prodviders</h1>
        <div className="container">
          <div className="table-wrapper">
            <table className="striped highlight table-styling centered">
              <thead>
                <tr>
                  <th>Provider Name</th>
                  <th>identification</th>
                  <th>Phone number</th>
                  <th>Remove?</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((provider) => (
                  <tr key={provider.id}>
                    <td>{provider.name}</td>
                    <td>{provider.idCard}</td>
                    <td>{provider.phoneNumber}</td>
                    <td>
                      <a
                        onClick={() => deleteSelectedProvider(provider.id) }
                        className="red btn"
                      >
                        Delete product
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default Providers;
