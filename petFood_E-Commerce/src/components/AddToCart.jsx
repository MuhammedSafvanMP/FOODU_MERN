import React, { useContext, useEffect, useState } from "react";
import { globalContext } from "../context/GlobalContext";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

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
    handleSignup,
    show,
    setShow,
    products,
    setProducts,
  ] = useContext(globalContext);
  const [total, setTotal] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const jwtToken = localStorage.getItem("userTocken");
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
          `http://localhost:3028/api/users/${user?._id}/cart`,
          config
        );
        setCart(response.data);
      } catch (error) {
        toast.error("Error fetching cart:", error);
      }
    };

    const fullQuantity = async () => {
      try {
        const jwtToken = localStorage.getItem("userTocken");
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
          `http://localhost:3028/api/users/${user?._id}/total`,
          config
        );
        setTotal(response.data);
      } catch (error) {
        toast.error("Error fetching total quantity:", error);
      }
    };

    fullQuantity();
    getCart();
  }, [user]);


  const Increment = async (id) => {
    window.location.reload();
    try {
      const jwtToken = localStorage.getItem("userTocken");
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
      const response = await axios.patch(
        `http://localhost:3028/api/users/${user?._id}/cart/${id}/increment`,
        {},
        config
      );
      if (response.status === 201) {
        toast.success("Product quantity incremented");
      }
    } catch (error) {
      toast.error("Error incrementing cart item:", error);
    }
  };

  const Decrement = async (id) => {
    window.location.reload();
    try {
      const jwtToken = localStorage.getItem("userTocken");
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
      const response = await axios.patch(
        `http://localhost:3028/api/users/${user?._id}/cart/${id}/decrement`,
        {},
        config
      );
      if (response.status === 200) {
        toast.success("Product quantity decremented");
      }
    } catch (error) {
      toast.error("Error decrementing cart item:", error);
    }
  };

  const handleDelete = async (id) => {
    window.location.reload();
    try {
      const jwtToken = localStorage.getItem("userTocken");
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
      const response = await axios.delete(
        `http://localhost:3028/api/users/${user?._id}/cart/${id}/remove`,
        config
      );
      if (response.status === 200) alert("Product removed successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handlePay = async (id) => {
    try {
      const jwtToken = localStorage.getItem("userTocken");
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

      const response = await axios.post(
        `http://localhost:3028/api/users/${id}/payment `,
        {},
        config
      );
      if (response.status === 200) toast.success("order now!");
      const url=response.data.url
      const conformation=window.confirm("Payment session created. Redirecting to the payment gateway. Continue?")
      if(conformation)window.location.replace(url)
    
    } catch (error) {
      toast.error("Error making payment:", error);
    }
  };
  

  return (
    <>
      <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <NavLink to="/" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Continue shopping
                        </NavLink>
                      </h5>
                      <hr />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">
                            You have {user && user.cart && user.cart.length}{" "}
                            items in your cart
                          </p>
                        </div>
                      </div>

                      {Array.isArray(cart) && cart.length !== 0 ? (
                        cart.map((cartItem) => {
                          if (cartItem.productId) {
                          return (
                            <div
                              className="card mb-3"
                              key={cartItem.productId._id}
                            >
                              <div className="card-body">
                                <div className="d-flex justify-content-between">
                                  <div className="d-flex flex-row align-items-center">
                                    <div>
                                      {cartItem.productId.productImg && (
                                        <img
                                          src={cartItem.productId.productImg}
                                          className="img-fluid rounded-3"
                                          alt="Shopping item"
                                          style={{ minWidth: "55px" }}
                                        />
                                      )}
                                    </div>
                                    <div className="ms-3">
                                      <h5>{cartItem.productId.title}</h5>
                                    </div>
                                  </div>
                                  <div className="d-flex flex-row align-items-center">
                                    <div className="input-group product-qty align-items-center w-25">
                                      <span className="input-group-btn">
                                        <button
                                          type="button"
                                          className="quantity-left-minus btn btn-light btn-number"
                                          data-type="minus"
                                          onClick={() =>
                                            Increment(cartItem.productId._id)
                                          }
                                        >
                                          <FaPlusSquare />
                                        </button>
                                      </span>
                                      <button>{cartItem.quantity}</button>
                                      <span className="input-group-btn">
                                        <button
                                          type="button"
                                          className="quantity-right-plus btn btn-light btn-number"
                                          data-type="plus"
                                          data-field=""
                                          onClick={() =>
                                            Decrement(cartItem.productId._id)
                                          }
                                        >
                                          <FaMinusSquare />
                                        </button>
                                      </span>
                                    </div>
                                    <div style={{ width: "80px" }}>
                                      <h5 className="mb-0">
                                        $ {cartItem.productId.price}
                                      </h5>
                                    </div>
                                    <a style={{ color: "#cecece" }}>
                                      <MdDelete
                                        style={{
                                          fontSize: "3rem",
                                          color: "black",
                                          cursor: "pointer",
                                        }}
                                        onClick={() =>
                                          handleDelete(cartItem.productId._id)
                                        }
                                      />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        })

                      ) : (
                        <tr>
                          <td colSpan="3">Cart empty</td>
                        </tr>
                      )}
                    </div>

                 
                    <div>
                                  <h1>${total.totalAmount}</h1>
                                  <h3>totalQuantity: {total.totalQuantity}</h3>
                                  <button onClick={() => handlePay(user._id)}>Pay</button>
                                </div>

                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


     

      </section>
    </>
  );
}
