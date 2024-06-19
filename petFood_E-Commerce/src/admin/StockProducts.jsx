import React, { useContext } from "react";
import { globalContext } from "../context/GlobalContext";
import AdminNavbar from "./AdminNavbar";

export default function StockProducts() {
  const [
    handleAdd,
        handleLike,
        filteredData,
        setFilteredData,
        user,
        setUser,
        search,
        setSearch,
        show,
        setShow,
        products,
     
  ] = useContext(globalContext);

  return (
    <>
    
    <AdminNavbar />
    
    <section className="content-info">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th className="text-left">No</th>
                    <th className="text-left">Image</th>
                    <th className="text-center">Title</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Stock</th>
                    <th className="text-center">Total Stock Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product, index) => (
                      <tr key={product._id}>
                        <td className="text-left number">{index + 1}</td>
                        <td className="text-left">
                          <img
                            className="img-fluid"
                            src={product.productImg}
                            alt="product_image"
                            width={"150px"}
                          />
                        </td>
                        <td>{product.title}</td>
                        <td>{product.price}</td>
                        <td>{product.stock == 0 ? "no stock" : product.stock}</td>
                        <td>{product.price * product.stock}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>

    </>
  );
}
