import axios from "axios";
import React, { useEffect, useState } from "react";
import RevanueProducts from "./RevanueProducts";

export default function Revanue() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        //   const jwtToken = localStorage.getItem('userTocken');
        //   if (!jwtToken) {
        //     toast.error('Token is not available');
        //     return;
        //   }
        //   const config = {
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Authorization: jwtToken,
        //     },
        //   };
        const response = await axios.get(
          `http://localhost:3028/api/admin/status`
        );
        setSales(response.data);
      } catch (error) {
        toast.error("Error fetching wishlist:", error);
      }
    };
    getOrder();
  }, []);

  console.log(sales, "");

  return (
    <>
      <div class="container mt-5 px-2">
        <div class="mb-2 d-flex justify-content-between align-items-center"></div>
        <div class="table-responsive">
          <table class="table table-responsive table-borderless">
            <thead>
              <tr class="bg-light">
                <th scope="col" width="5%">
                  <input class="form-check-input" type="checkbox" />
                </th>
                <th scope="col" width="5%">
                  #
                </th>
                <th scope="col" width="20%">
                  User names
                </th>
                <th scope="row" width="20%">
                  Date
                </th>
                <th scope="col" width="20%">
                  Time
                </th>
                <th scope="col" width="20%">
                  Purchased
                </th>
                <th scope="row" class="text-end" width="20%">
                  <span>Revenue</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sales.length !== 0 ? (
                sales.alluser.user.map((details, index) => (
                  <tr key={details._id}>
                    <td>
                      <input class="form-check-input" type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{details.username}</td>

                    <ul>
                      {details.orders.map((order) => {
                        return (
                          <>
                            <ul>
                              <td width="20%">{order.purchaseDate}</td>
                              <td width="20%">{order.orderTime}</td>

                              <td>
                                
                                <ul >
                                  {order.productId.map((product) => (
                                    <li  key={product._id}>
                                      {product.title} --{" "}
                                      <span> ${product.price}</span>
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td class="text-end">
                                <span class="fw-bolder">
                                  ${order.totalPrice}
                                </span>{" "}
                              </td>
                            </ul>
                          </>
                        );
                      })}
                    </ul>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="7">No sales report</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RevanueProducts />

      {sales.length !== 0 ? (
        <div>
          <h2> Total sales amount : {sales.data.totalRevenue}</h2>
          <h4>Sale products {sales.data.totalProduct}</h4>
        </div>
      ) : (
        <div>No sales</div>
      )}
    </>
  );
}
