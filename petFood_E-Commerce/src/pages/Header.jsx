import React, { useContext, useEffect } from "react";
import { FaUser, FaHeart } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { globalContext } from "../context/GlobalContext";
import axios from "axios";
import instance from "../Axios";
import toast from "react-hot-toast";

export default function Header() {
  const Navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("userTocken")
    localStorage.removeItem( "userId")
    Navigate("/");
  };

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const findUser = async () => {
      try {
        await instance({
          url: `/users/userid/${userId}`,
          method: "GET",
        }).then((res) => {
          setUser(res.data.data)
          });
        } catch (e) {
          toast.error(e.res?.data?.message);
        }
     }
     findUser()
    }, [userId, handleLogout])


  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasSearch"
        aria-labelledby="Search"
      >
        <div className="offcanvas-header justify-content-center">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="order-md-last">
            <h4 className="text-primary text-uppercase mb-3">Search</h4>
            <div className="search-bar border rounded-2 border-dark-subtle">
              <form
                onClick={() => Navigate("/cards")}
                id="search-form"
                className="text-center d-flex align-items-center"
                action=""
                method=""
              >
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control border-0 bg-transparent"
                  placeholder="Search Here"
                />
                <iconify-icon
                  icon="tabler:search"
                  className="fs-4 me-3"
                ></iconify-icon>
              </form>
            </div>
          </div>
        </div>
      </div>

      <header>
        <div className="container py-2">
          <div className="row py-4 pb-0 pb-sm-4 align-items-center">
            <div className="col-sm-4 col-lg-3 text-center text-sm-start">
              <div className="main-logo">
                <a>
                  <img
                    src="../images/chocolat/logo.png"
                    width={"100px"}
                    alt="logo"
                    className="img-fluid"
                  />
                </a>
              </div>
            </div>

            <div className="col-sm-6 offset-sm-2 offset-md-0 col-lg-5 d-none d-lg-block">
              <div className="search-bar border rounded-2 px-3 border-dark-subtle">
                <form
                  onClick={() => Navigate("/cards")}
                  id="search-form"
                  className="text-center d-flex align-items-center"
                  action=""
                  method=""
                >
                  <input
                    type="text"
                    className="form-control border-0 bg-transparent"
                    placeholder="Search Items"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"
                    />
                  </svg>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <hr className="m-0" />
        </div>

        <div className="container">
          <nav className="main-menu d-flex navbar navbar-expand-lg ">
            <div className="d-flex d-lg-none align-items-end mt-3">
              <ul className="d-flex justify-content-end list-unstyled m-0">
                <li>
                  <li class="nav-item dropdown">
                    <a
                      class="nav-link dropdown-toggle mx-3"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="fs-4">
                        {" "}
                        <FaUser />{" "}
                      </span>
                      <h5 className="mb-0 " style={{ fontSize: "8px" }}>
                        {" "}
                        {user && user.username}{" "}
                      </h5>
                    </a>
                    <ul
                      class="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <Link class="dropdown-item" to="/signup">
                          Sign Up
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link class="dropdown-item" to="/dashbord">
                          Admin
                        </Link>
                      </li>
                      <li>
                        <a
                          class="dropdown-item"
                          style={{ cursor: "pointer" }}
                          onClick={handleLogout}
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </li>
                <li>
                  <NavLink
                    to={user && user.username ? "/whishlist" : "/signup"}
                    className="mx-3"
                  >
                    <span className="fs-4">
                      {" "}
                      <FaHeart />{" "}
                    </span>
                    <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                      {user && user.wishlist && user.wishlist.length}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={user && user.username ? "/addcart" : "/signup"}
                    className="mx-3"
                  >
                    <span className="fs-4 position-relative">
                      {" "}
                      <FaCartShopping />{" "}
                    </span>
                    <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                      {user && user.cart && user.cart.length}
                    </span>
                  </NavLink>
                </li>
                <li>
                  <a
                    className="mx-3"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasSearch"
                    aria-controls="offcanvasSearch"
                  >
                    <span className="fs-4">
                      {" "}
                      <IoSearch icon="tabler:search" />{" "}
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header justify-content-center">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body justify-content-between">
                <ul class="navbar-nav menu-list list-unstyled d-flex gap-md-3 mb-0">
                  <li class="nav-item">
                    <NavLink to="/">
                      <a class="nav-link active">Home</a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink to="/product">
                      <a class="nav-link">Product</a>
                    </NavLink>
                  </li>
                  <li class="nav-item">
                    <NavLink to="/order">
                      <a class="nav-link">Order</a>
                    </NavLink>
                  </li>
                </ul>
                <div className="d-none d-lg-flex align-items-end">
                  <ul className="d-flex justify-content-end list-unstyled m-0">
                    <li>
                      <li class="nav-item dropdown">
                        <a
                          class="nav-link dropdown-toggle mx-3"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span className="fs-4">
                            {" "}
                            <FaUser />{" "}
                          </span>
                          <h5 className="mb-0 " style={{ fontSize: "10px" }}>
                            {" "}
                            {user && user.username}{" "}
                          </h5>
                        </a>
                        <ul
                          class="dropdown-menu"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          <li>
                            <Link class="dropdown-item" to="/signup">
                              Sign Up
                            </Link>
                          </li>
                          <li>
                            <Link class="dropdown-item" to="/login">
                              Login
                            </Link>
                          </li>
                          <li>
                            <Link class="dropdown-item" to="/dashbord">
                              Admin
                            </Link>
                          </li>
                          <li>
                            <a class="dropdown-item" onClick={handleLogout}>
                              Logout
                            </a>
                          </li>
                        </ul>
                      </li>
                    </li>
                    <li>
                      <NavLink
                        to={user && user.username ? "/whishlist" : "/signup"}
                        className="mx-3"
                      >
                        <span className="fs-4">
                          {" "}
                          <FaHeart />{" "}
                        </span>
                        <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                          {user && user.wishlist && user.wishlist.length}
                        </span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={user && user.username ? "/addcart" : "/signup"}
                        className="mx-3"
                      >
                        <span className="fs-4 position-relative">
                          {" "}
                          <FaCartShopping />{" "}
                        </span>
                        <span className="position-absolute translate-middle badge rounded-circle bg-primary pt-2">
                          {user && user.cart && user.cart.length}
                        </span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
