import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { globalContext } from "../context/GlobalContext";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import instance from "../Axios";

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
        await instance({
          url: `/users/${user?._id}/wishlist`,
          method: "GET",
        }).then((res) => {
          setWishlist(res.data.data);
        });
      } catch (e) {
        toast.error(e.res.data.message);
      }

    };
    getWishlist();

  }, [user._id, wishlist, setWishlist]);

  // delet wishlist items
  
  const handleDelete = async (id) => {
    try {
      await instance({
        url: `/users/${user?._id}/wishlist/${id}/remove`,
        method: "DELETE",
      }).then((res) => {
          toast.success(res.data.message);
      });
    } catch (e) {
      toast.error(e.res.data.message);
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
                  if (data.products) {
                    return (
                      <tr key={data._id}>
                        <td className="py-4">
                          <div className="cart-info d-flex flex-wrap align-items-center ">
                            <div className="col-lg-3">
                              <div className="card-image">
                                <img
                                  src={data.products.productImg}
                                  alt="cloth"
                                  className="img-fluid"
                                  onClick={() => Navigate(`/product/${data.products._id}`)}
                                />
                              </div>
                            </div>
                            <div className="col-lg-9">
                              <div className="card-detail ps-3">
                                <h5 className="card-title">
                                  <NavLink className="text-decoration-none">
                                    {data.products.title}
                                  </NavLink>
                                </h5>
                                <p className="card-text">
                                  Price:€ {data.products.price}.00
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
                                onClick={() => handleAdd(data.products._id)}
                                className="btn btn-dark p-3 text-uppercase fs-6 btn-rounded-none w-100"
                              >
                                Add to cart
                              </button>
                            </div>
                            <div className="cart-remove">
                              <MdDelete
                                style={{ fontSize: "3rem", cursor: "pointer" }}
                                onClick={() => handleDelete(data.products._id)}
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
