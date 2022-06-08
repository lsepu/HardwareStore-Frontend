import Header from "../components/Header";

const Stock = () => {
  return (
    <>
      <Header />

      <h1 className="tab-title">Product Stock</h1>
      <div className="container">
        <div className="table-wrapper">
          <table className="striped highlight table-styling centered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Min units</th>
                <th>Max units</th>
                <th>Provider</th>
                <th>Quantity</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Screw</td>
                <td>A great screw to have in your store</td>
                <td>$0.87</td>
                <td>2</td>
                <td>10</td>
                <td>Pepito</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Stock;
