import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from '../context/GlobalContext';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Order() {
  const [
    handleAdd,
    handleLike,
    filteredData,
    setFilteredData,
    user,
    setUser,
    search,
    setSearch,
    handleSignup,
    show,
    setShow,
    products,
    setProducts,
  ] = useContext(globalContext);

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const jwtToken = localStorage.getItem('userTocken');
        if (!jwtToken) {
          toast.error('Token is not available');
          return;
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: jwtToken,
          },
        };
        const response = await axios.get(`http://localhost:3028/api/users/${user?._id}/orders`, config);
        setOrder(response.data);
      } catch (error) {
        toast.error('Error fetching wishlist:', error);
      }
    };
    getOrder();
  }, [user]);


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
                  Date
                </th>
                <th scope="col" width="20%">
                  Time
                </th>
                <th scope="col" width="10%">
                  Status
                </th>
                <th scope="col" width="20%">
                  Purchased
                </th>
                <th scope="col" class="text-end" width="20%">
                  <span>Revenue</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {order.length !== 0 ? (
                order.map((order, index) => (
                  <tr key={order._id}>
                    <td>
                      <input class="form-check-input" type="checkbox" />
                    </td>
                    <td>{index + 1}</td>
                    <td>{  Date(order.purchaseDate)}</td>
                    <td>{order.orderTime}</td>
                    <td>
                      <i class="fa fa-check-circle-o green"></i>
                      <span class="ms-1">Paid</span>
                    </td>
                    <td>
                      <ul>
                        {order.productId.map((product) => (
                          <li key={product._id}>{product.title} -- <span> ${product.price}</span></li>
                        ))}
                      </ul>
                    </td>
                    <td class="text-end">
                      <span class="fw-bolder">${order.totalPrice}</span>{' '}
                      <i class="fa fa-ellipsis-h ms-2"></i>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colspan="7">No orders</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
