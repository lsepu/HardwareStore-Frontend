import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { deleteProduct } from "../state/actions";
import { AppDispatch, stateType } from "../state/store";

const Stock = () => {
  const products = useSelector((state: stateType) => state.product.products);
  //console.log(products);

  const dispatch = useDispatch<AppDispatch>();

  const deleteSelectedProduct = (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      dispatch(deleteProduct(id));
    }
  };

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
                <th>Remove?</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.minUnits}</td>
                  <td>{product.maxUnits}</td>
                  <td>{product.provider.name}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <a
                      onClick={() => deleteSelectedProduct(product.id)}
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

export default Stock;
