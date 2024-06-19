import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../context/GlobalContext";
import { FaPlusSquare, FaMinusSquare, FaTimes, FaLongArrowAltLeft } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import instance from "../Axios";

export default function AddToCart() {
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

  const [total, setTotal] = useState([]);
  const [cart, setCart] = useState([]);

  const Navigate = useNavigate();

  const Increment = async (id) => {
    try {
      const res = await instance.patch(`/users/${user?._id}/cart/${id}/increment`);
      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (e) {
      toast.error(e.res?.data?.message);
    }
  };

  const Decrement = async (id) => {
    try {
      const res = await instance.patch(`/users/${user?._id}/cart/${id}/decrement`);
      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (e) {
      toast.error(e.res?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await instance.delete(`/users/${user?._id}/cart/${id}/remove`);
      if (res.status === 200) {
        toast.success(res.data.message);
      }
    } catch (e) {
      toast.error(e.res?.data?.message);
    }
  };


  const handlePay = async (id) => {
    try {
      const res = await instance.post(`/users/${id}/payment`);
      if (res.status === 200) {
        toast.success("Order now!");
        const url = res.data.url;
        const confirmation = window.confirm("Payment session created. Redirecting to the payment gateway. Continue?");
        if (confirmation) window.location.replace(url);
      } else {
        toast.error("Cart is empty, please add products to the cart.");
      }
    } catch (e) {
      toast.error(e.res?.data?.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await instance.get(`/users/${user?._id}/cart`);
        setCart(cartResponse.data.data);
  
        const totalResponse = await instance.get(`/users/${user?._id}/total`);
        setTotal(totalResponse.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
  
    if (user?._id) {
      fetchData();
    }
  }, [user?._id, cart, setCart]); 
  


  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "#fff" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12">
            <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-lg-8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">Shopping Cart</h1>
                        <h6 className="mb-0 text-muted">{cart.length} items</h6>
                      </div>
                      <hr className="my-4" />

                      {cart.length > 0 ? (
                        cart.map((cartItem) => (
                          <div key={cartItem.products._id} className="row mb-4 d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={cartItem.products.productImg}
                                className="img-fluid rounded-3"
                                alt="product_image"
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">{cartItem.products.category}</h6>
                              <h6 className="text-black mb-0">{cartItem.products.title}</h6>
                              <h6 className="text-black mb-0">€ {cartItem.products.price}</h6>

                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                              <button
                                className="btn btn-link px-2"
                                onClick={() => Decrement(cartItem.products._id)}
                              >
                                <FaMinusSquare />
                              </button>
                              <button>{cartItem.quantity}</button>

                              <button
                                className="btn btn-link px-2"
                                onClick={() => Increment(cartItem.products._id)}
                              >
                                <FaPlusSquare />
                              </button>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">€ {cartItem.products.price * cartItem.quantity}</h6>
                            </div>
              
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a  className="text-muted" style={{cursor: "pointer"}} onClick={() => handleDelete(cartItem.products._id)}>
                                <FaTimes />
                              </a>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>Cart is empty</div>
                      )}
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <NavLink to="/" className="text-body">
                            <FaLongArrowAltLeft className="me-2" onClick={() => Navigate("/") } />
                            Back to shop
                          </NavLink>
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 bg-grey">
                    <div className="p-5">
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total price</h5>
                        <h5>€ {total.totalAmount}</h5>
                      </div>
                      <div className="d-flex justify-content-between mb-5">
                        <h5 className="text-uppercase">Total product</h5>
                        <h5>€ {total.totalQuantity}</h5>
                      </div>
                      <button type="button" className="btn btn-dark btn-block btn-lg" onClick={() => handlePay(user._id)}>
                        Order now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
