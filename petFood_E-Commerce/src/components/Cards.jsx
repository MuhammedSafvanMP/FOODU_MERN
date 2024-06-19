import React, { memo, useContext, useEffect, useState } from "react";
import { globalContext } from "../context/GlobalContext";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import instance from "../Axios";

function Cards() {
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
    dashbord,
    setDashBord,
    active,
    setActive,
    wishActive,
    setWishActive,
  ] = useContext(globalContext);

  const Navigate = useNavigate();

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const fetchProductImages = async () => {
      try {
        if (search.trim() === "") {
          setSearchData(products);
        } else {
          await instance({
            url: `/users/products/category/${search}`,
            method: "GET",
          }).then((res) => {
            setSearchData(res.data.data);
          });
        }
      } catch (e) {
        toast.error(error.res?.data?.message);
      }
    };

    fetchProductImages();
  }, [search]); // Re-fetch data when the search query changes

  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="text-center container py-5">
          <h4 className="mt-4 mb-5">
            <strong>Bestsellers</strong>
          </h4>

          <div className="row">
            {(search.trim() === "" ? products : searchData)
              // .filter((val) => {
              //   if (search === "") return val;

              //   const lowerCaseSearch = search.toLowerCase();

              //   if (
              //     val.title &&
              //     val.title.toLowerCase().includes(lowerCaseSearch)
              //   ) {
              //     return val;
              //   } else if (
              //     val.category &&
              //     val.category.toLowerCase().includes(lowerCaseSearch)
              //   ) {
              //     return val;
              //   }

              //   return null;
              // })

              .map((val) => {
                const isActive = active?.find(
                  (item) => item.products._id === val._id
                );
                const isActiveWish = wishActive?.find(
                  (item) => item.products._id === val._id
                );
                return (
                  <div className="col-lg-4 col-md-12 mb-4" key={val._id}>
                    <div className="card">
                      <div
                        className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          style={{ cursor: "pointer" }}
                          src={val.productImg}
                          onClick={() => Navigate(`/product/${val._id}`)}
                          className="w-100"
                          alt="Product Image"
                        />
                        <a>
                          <div className="mask">
                            <div className="d-flex justify-content-start align-items-end h-100">
                              <h5>
                                <span className="badge bg-primary ms-2">
                                  New
                                </span>
                              </h5>
                            </div>
                          </div>
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.15)",
                              }}
                            ></div>
                          </div>
                        </a>
                      </div>
                      <div className="card-body">
                        <a href="" className="text-reset">
                          <h5 className="card-title mb-3">{val.title}</h5>
                        </a>
                        <a href="" className="text-reset">
                          <p>{val.category}</p>
                        </a>
                        <h6 className="mb-3">€ {val.price}.00</h6>
                      </div>
                      <div className="d-flex flex-wrap mt-3">
                        <a
                          onClick={(e) =>
                            show && show.name
                              ? handleAdd(val._id)
                              : Navigate("/signup")
                          }
                          className="btn-cart me-3 px-4 pt-3 pb-3"
                          style={{ cursor: "pointer" }}
                        >
                          <h5 className="text-uppercase m-0">
                            {isActive ? "Added  Cart" : "Add to Cart"}
                          </h5>{" "}
                        </a>
                        <a
                          onClick={(e) =>
                            show && show.name
                              ? handleLike(val._id)
                              : Navigate("/signup")
                          }
                          className="btn-wishlist px-4 pt-3 "
                          style={{ cursor: "pointer", color: isActiveWish ? "red" : "black" }}
                        >
                          <FaHeart
                            icon="fluent:heart-28-filled"
                            className="fs-5"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Cards);
