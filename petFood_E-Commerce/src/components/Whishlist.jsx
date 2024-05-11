import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { globalContext } from "../context/GlobalContext";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";

export default function Wishlist() {
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

  const [wishlist, setWishlist] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    const getWishlist = async () => {
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
        const response = await axios.get(`http://localhost:3028/api/users/${user?._id}/wishlist`, config);
        setWishlist(response.data);
      } catch (error) {
        toast.error("Error fetching wishlist:", error);
      }
    };
    getWishlist();
  }, [user]);

  
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
      const response = await axios.delete(`http://localhost:3028/api/users/${user?._id}/wishlist/${id}/remove`, config);
      if(response.status === 200)
        toast.success("Product removed successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  

  return (
    <>
      <section id="Wishlist" className="py-5 my-5">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="card-title text-uppercase">
                  Products
                </th>
                <th scope="col" className="card-title text-uppercase"></th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(wishlist) && wishlist.length !== 0 ?  (
                wishlist.map((data) => {
                  if (data.productId) {
                    return (
                      <tr key={data._id}>
                        <td className="py-4">
                          <div className="cart-info d-flex flex-wrap align-items-center ">
                            <div className="col-lg-3">
                              <div className="card-image">
                                <img
                                  src={data.productId.productImg}
                                  alt="cloth"
                                  className="img-fluid"
                                  onClick={() => Navigate(`/product/${data.productId._id}`)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-9">
                              <div className="card-detail ps-3">
                                <h5 className="card-title">
                                  <NavLink className="text-decoration-none">
                                    {data.productId.title}
                                  </NavLink>
                                </h5>
                                <p className="card-text">
                                  Price: ${data.productId.price}.00
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 align-middle">
                          <div className="total-price">
                            <span className="secondary-font fw-medium">
                              In Stock
                            </span>
                          </div>
                        </td>
                        <td className="py-4 align-middle">
                          <div className="d-flex align-items-center">
                            <div className="me-4">
                              <button
                                onClick={() => handleAdd(data.productId._id)}
                                className="btn btn-dark p-3 text-uppercase fs-6 btn-rounded-none w-100"
                              >
                                Add to cart
                              </button>
                            </div>
                            <div className="cart-remove">
                              <MdDelete
                                style={{ fontSize: "3rem", cursor: "pointer" }}
                                onClick={() => handleDelete(data.productId._id)}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  } 
                })
              ) : (
                <tr>
                  <td colSpan="3">Wishlist empty</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
