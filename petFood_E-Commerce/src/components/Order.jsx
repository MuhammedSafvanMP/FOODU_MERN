import React, { useContext, useEffect, useState } from 'react';
import { globalContext } from '../context/GlobalContext';
import toast from 'react-hot-toast';
import instance from '../Axios';
import moment from "moment";

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
    show,
    setShow,
    products,
    setProducts,
  ] = useContext(globalContext);

  const [order, setOrder] = useState([]);

  useEffect(() => {
    const getOrder = async () => {
      try {
      const orders = await instance.get(`/users/${user?._id}/orders`);
      setOrder(orders.data.data);
      console.log(orders.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    };
    getOrder();
    console.log(order);
  }, [user?._id]);





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
                    <td> {new Date(order.purchaseDate).getUTCDate()}/ {new Date(order.purchaseDate).getMonth()} / { new Date(order.purchaseDate).getFullYear() }</td>
                    <td>{ order.orderTime}</td>
                    <td>
                      <i class="fa fa-check-circle-o green"></i>
                      <span class="ms-1">{order.orderStatus}</span>
                    </td>
                    <td>
                      <ul>
                        {order.products.map((product) => (
                          <li key={product._id}>{product.title} -- <span>€ {product.price}</span></li>
                        ))}
                      </ul>
                    </td>
                    <td class="text-end">
                      <span class="fw-bolder">€ {order.totalPrice}</span>{' '}
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
