import { useContext, memo, useEffect, useState, useCallback } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { globalContext } from "../context/GlobalContext";
import instance from "../Axios";
import toast from "react-hot-toast";

function Foodies() {
  const navigate = useNavigate();
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
    setWishActive
  ] = useContext(globalContext);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartResponse = await instance.get(`/users/${user?._id}/cart`);
        setActive(cartResponse.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    const getWishlist = async () => {
      try {
        const wishlistResponse = await instance.get(`/users/${user?._id}/wishlist`);
        setWishActive(wishlistResponse.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    if (user?._id) {
      fetchData();
      getWishlist();
    }
  }, [user?._id], active, setActive, wishActive, setWishActive);

  const handleAll = useCallback(() => {
    setFilteredData(products);
  }, [products]);

  const handleCat = useCallback(() => {
    const catData = products.filter((food) => food.category === "cat");
    setFilteredData(catData);
  }, [products]);

  const handleFish = useCallback(() => {
    const fishData = products.filter((food) => food.category === "fish");
    setFilteredData(fishData);
  }, [products]);

  const handleDog = useCallback(() => {
    const dogData = products.filter((food) => food.category === "dog");
    setFilteredData(dogData);
  }, [products]);

  const handleBird = useCallback(() => {
    const birdData = products.filter((food) => food.category === "bird");
    setFilteredData(birdData);
  }, [products]);

  return (
    <>
      <section id="foodies" className="my-5">
        <div className="container my-5 py-5">
          <div className="section-header d-md-flex justify-content-between align-items-center">
            <h2 className="display-3 fw-normal">Pet Foodies</h2>
            <div className="mb-4 mb-md-0">
              <p className="m-0">
                <button
                  className="filter-button me-4 active"
                  data-filter="*"
                  onClick={handleAll}
                >
                  ALL
                </button>
                <button
                  className="filter-button me-4"
                  data-filter=".cat"
                  onClick={handleCat}
                >
                  CAT
                </button>
                <button
                  className="filter-button me-4"
                  data-filter=".dog"
                  onClick={handleDog}
                >
                  DOG
                </button>
                <button
                  className="filter-button me-4"
                  data-filter=".bird"
                  onClick={handleBird}
                >
                  BIRD
                </button>
                <button
                  className="filter-button me-4"
                  data-filter=".fish"
                  onClick={handleFish}
                >
                  FISH
                </button>
              </p>
            </div>
            <div>
              <NavLink
                to="/"
                className="btn btn-outline-dark btn-lg text-uppercase fs-6 rounded-1"
              >
                shop now
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="mb-1"
                >
                  <use xlinkHref="#arrow-right"></use>
                </svg>
              </NavLink>
            </div>
          </div>

          <div className="isotope-container row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
            {filteredData &&
              filteredData.map((food) => {
                const isActive = active?.find((item) => item.products._id === food._id);
                const isActiveWish = wishActive?.find((item) => item.products._id === food._id);

                return (
                  <div key={food._id}>
                    <div className="card position-relative">
                      <img
                        onClick={() => navigate(`/product/${food._id}`)}
                        src={food.productImg}
                        className="img-fluid rounded-4"
                        style={{ cursor: "pointer" }}
                        alt="image"
                      />
                      <div className="card-body p-3">
                        <a>
                          <h3 className="card-title pt-2 m-0">{food.title}</h3>
                        </a>
                        <div className="card-text">
                          <span className="rating secondary-font">
                            {Array.from({ length: food.rating }, (_, index) => (
                              <FaStar key={index} className="text-primary" />
                            ))}
                          </span>
                          <h3 className="secondary-font text-primary">€ {food.price}.00</h3>
                          <div className="d-flex flex-wrap mt-2">
                            <a
                              onClick={() =>
                                user && user.username
                                  ? handleAdd(food._id)
                                  : navigate("/signup")
                              }
                              className="btn-cart me-2 px-3 py-2"
                              style={{ cursor: "pointer" }}
                            >
                              <h5 className="text-uppercase m-0">
                                {isActive ? "Added  Cart" : "Add to Cart"}
                              </h5>
                            </a>
                            <a
                              onClick={() =>
                                user && user.username
                                  ? handleLike(food._id)
                                  : navigate("/signup")
                              }
                              className="btn-wishlist px-3 py-2"
                              style={{ cursor: "pointer", color: isActiveWish ? "red" : "black" }}
                            >
                              <FaHeart className="fs-5" />
                            </a>
                          </div>
                        </div>
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

export default memo(Foodies);
