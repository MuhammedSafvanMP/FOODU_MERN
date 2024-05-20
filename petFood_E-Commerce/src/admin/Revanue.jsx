import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNavbar from "./AdminNavbar";

export default function Revenue() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {

        const jwtToken = localStorage.getItem("adminToken");
        if (!jwtToken) {
          toast.error("Token is not available");
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: jwtToken,
          },
        };


        const response = await axios.get(
          `http://localhost:3028/api/admin/status`, config
        );
        setSales(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    getOrder();
  }, []);

  return (
    <>
  <AdminNavbar />
    <div className="container-fluid mt-5 px-2">
      <div className="mb-2 d-flex justify-content-between align-items-center"></div>
      <div className="table-responsive">
        <table className="table table-bordered" style={{ borderWidth: "2px" }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Product Image</th>
              <th scope="col">Product Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.length !== 0 ? (
              sales.alluser.user.map((details, index) =>
                details.orders.map((order, idx) => (
                  <tr key={`${index}-${idx}`}>
                    {idx === 0 && (
                      <td rowSpan={details.orders.length}>{index + 1}</td>
                    )}
                    <td>{details.username}</td>
                    <td>{order.purchaseDate}</td>
                    <td>{order.orderTime}</td>
                    <td>
                      {order.productId.map((product) => (
                        <img
                          key={product._id}
                          width={"80px"}
                          src={product.productImg}
                          alt="product_image"
                        />
                      ))}
                    </td>
                    <td>
                      {order.productId.map((product) => (
                        <div key={product._id}>{product.title}</div>
                      ))}
                    </td>
                    <td>
                      {order.productId.map((product) => (
                        <div key={product._id}>${product.price}</div>
                      ))}
                    </td>
                    <td>
                      {order.quantity.map((quantity, index) => (
                        <div key={index}>{quantity}</div>
                      ))}
                    </td>
                    <td>
                      {order.productId.map((product, index) => (
                        <div key={product._id}>
                          ${product.price * order.quantity[index]}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="9">No sales report</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      {sales.length !== 0 ? (
        <div className="text-center">
          <h2>Total sales amount: ${sales.data.totalRevenue}</h2>
          <h4>Sale products: {sales.data.totalProduct}</h4>
        </div>
      ) : (
        <div>No sales</div>
      )}
    </div>
    </>
  );
}
