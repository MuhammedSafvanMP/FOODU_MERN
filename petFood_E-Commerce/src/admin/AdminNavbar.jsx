import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { FaCarTunnel } from "react-icons/fa6";
import { GiShoppingCart } from "react-icons/gi";





export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };
  return (
    <>
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar"
      >
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page">
                <span data-feather="home"></span>
                Admin
              </a>
            </li>
            <li className="nav-item">
              <li className="nav-link">
                <span data-feather="file"></span>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </li>
            <li className="nav-item">
              <NavLink to="/users" className="nav-link">
              <FaRegUser />
                Users
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className="nav-link">
              <FaCartArrowDown />
                Products
              </NavLink>
            </li>

            <li class="nav-item">
              <NavLink to="/sales" class="nav-link">
              <FaCarTunnel />
                Sales
              </NavLink>
            </li>
            <li class="nav-item">
              <NavLink to="/stock" class="nav-link">
              <GiShoppingCart />
                Stock
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
