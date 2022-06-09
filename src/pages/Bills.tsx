import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { stateType } from "../state/store";

const Bills = () => {
  const bills = useSelector((state: stateType) => state.bill.bills);

  return (
    <div>
      <Header />
      <h1 className="tab-title">Bills</h1>
      <div className="container">
        <div className="table-wrapper">
          <table className="striped highlight table-styling centered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client Name</th>
                <th>Sales person name</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id}>
                  <td>{bill.date}</td>
                  <td>{bill.clientName}</td>
                  <td>{bill.salesPersonName}</td>
                  <td>
                    {bill.products.map((prod, index) => (
                      <p key={index}>
                        <span style={{ fontWeight: "bold" }}>Name:</span>{" "}
                        {prod.name} ----{" "}
                        <span style={{ fontWeight: "bold" }}>Quantity:</span>{" "}
                        {prod.quantity} ----{" "}
                        <span style={{ fontWeight: "bold" }}>Total:</span>{" "}
                        {prod.price}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bills;
