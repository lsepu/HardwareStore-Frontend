
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import { stateType } from "../../state/store";

const Receipts = () => {
  const receipts = useSelector((state: stateType) => state.receipt.receipts);

  return (
    <div>
      <Header />
      <h1 className="tab-title">Receipts</h1>
      <div className="container">
        <div className="table-wrapper">
          <table className="striped highlight table-styling centered">
            <thead>
              <tr>
                <th>Date</th>
                <th>Product</th>
                <th>Provider</th>
                <th>Amount of units</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((receipt, index) => (
                <tr key={index}>
                  <td>{receipt.date}</td>
                  <td>{receipt.productName}</td>
                  <td>{receipt.providerName}</td>
                  <td>{receipt.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Receipts;
