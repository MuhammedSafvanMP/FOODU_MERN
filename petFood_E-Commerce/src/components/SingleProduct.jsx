import React, { memo, useContext, useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { foodData } from "../data/data";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { globalContext } from "../context/GlobalContext";
import axios from "axios";
import toast from "react-hot-toast";
import instance from "../Axios";


 function SingleProduct() {
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

  const { id } = useParams();
  const [SingleProduct, setSingleProduct] = useState({})


  useEffect(() => {
    const getsingleproduct = async () => {

      try {
        await instance({
          url: `/users/products/${id}`,
          method: "GET",
        }).then((res) => {
          console.log(res, "eoiiie");
          setSingleProduct(res.data.data);
        });
      } catch (e) {
        toast.error(res.data.message);
      }
    };
  
    getsingleproduct();
  }, [id]);


  // const product = foodData.find((data) => data.id == id);
  const Navigate = useNavigate();
  return (
    <>
      <section id="selling-product">
        <div className="container my-md-5 py-5">
          <div className="row g-md-5">
            <div className="col-lg-6">
              <div className="row">
                <div className="col-md-12">
                  <div className="swiper product-large-slider">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <img
                          width={"80%"}
                          src={SingleProduct.productImg}
                          className="img-fluid"
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mt-5 ">
              <div className="product-info">
                <div className="element-header">
                  <h2 className="display-6">
                    {" "}
                    {SingleProduct.title}{" "}
                  </h2>
                  <div className="rating-container d-flex gap-0 align-items-center">
                    <span className="rating secondary-font">
                    </span>
                  </div>
                </div>
                <div className="product-price pt-3 pb-3">
                  <strong className="text-primary display-6 fw-bold">
                    ${SingleProduct.price}.00
                  </strong>
                  <del className="ms-2">$240.00</del>
                </div>
                <p>
                 {SingleProduct.description}
                </p>
                <p>
                 {SingleProduct.category}
                </p>
                <div className="cart-wrap">
                  <div className="product-quantity pt-2">
                    <div className="stock-button-wrap">
                      <div className="d-flex flex-wrap pt-4">
                        <a
                          onClick={() => (user && user.username ? handleAdd(SingleProduct._id) : Navigate('/signup'))}
                          className="btn-cart me-3 px-4 pt-3 pb-3"
                          style={{ cursor: "pointer" }}
                        >
                          <h5 className="text-uppercase m-0">Add to Cart</h5>
                        </a>
                        <a
                          onClick={() => (user && user.username ? handleLike(SingleProduct._id) : Navigate('/signup'))}
                          className="btn-wishlist px-4 pt-3 "
                          style={{ cursor: "pointer" }}
                        >
                          <FaHeart
                            icon="fluent:heart-28-filled"
                            className="fs-5"
                          />
                        </a>
                      </div>
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

export default memo(SingleProduct)
