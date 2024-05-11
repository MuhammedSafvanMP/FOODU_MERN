// Products.js

import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { globalContext } from "../context/GlobalContext";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import toast from "react-hot-toast";

export default function Products() {
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

  const [newProduct, setNewProduct] = useState({
    image: null,
    price: 0,
    stock: 0,
    category: "",
    title: "",
    description: ""
  });

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleADD = async (e) => {
    e.preventDefault();
    try {
      const jwtToken = localStorage.getItem("adminToken");
      if (!jwtToken) {
        toast.error("Token is not available");
        return;
      }

      const formData = new FormData();
      formData.append('image', newProduct.image);
      formData.append('price', newProduct.price);
      formData.append('stock', newProduct.stock);
      formData.append('category', newProduct.category);
      formData.append('title', newProduct.title);
      formData.append('description', newProduct.description);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: jwtToken,
        },
      };

      const response = await axios.post(
        `http://localhost:3028/api/admin/createProducts`,
        formData,
        config
      );

      if (response.status === 201) {
        toast.success("Product created successfully");
      } else {
        toast.error("Product not added", response.data);
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }

    e.target.reset();
  };

  const handleDelete = async (id) => {
    setProducts((prevProduct) => prevProduct.filter((data) => data.id !== id));

    window.location.reload();
    try {
      const jwtToken = localStorage.getItem("adminToken");
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
      const response = await axios.delete(`http://localhost:3028/api/admin/products/delete/${id}`, config);
      if(response.status === 200)
        toast.success("Product removed successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const Navigate = useNavigate();

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <AdminNavbar />

          <form className="container w-75" onSubmit={handleADD}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                placeholder="Product name"
                value={newProduct.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                placeholder="Product price"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                id="stock"
                name="stock"
                placeholder="stock"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                placeholder="Product category"
                value={newProduct.category}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                placeholder="Product description"
                value={newProduct.description}
                onChange={handleChange }
              />
            </div>

            <div className="mb-3">
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                accept="image/*"
                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              ADD
            </button>
          </form>

          <section id="Wishlist" className="py-5 my-5">
            <div className="container">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col" className="card-title text-uppercase">
                      Product
                    </th>
                    <th scope="col" className="card-title text-uppercase">
                      Unit Price
                    </th>
                    <th scope="col" className="card-title text-uppercase">
                      Category
                    </th>
                    <th scope="col" className="card-title text-uppercase"></th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products?.map((product) => {
                      return (
                        <tr key={product._id}>
                          <td className="py-4">
                            <div className="cart-info d-flex flex-wrap align-items-center ">
                              <div className="col-lg-3">
                                <div className="card-image">
                                  <img
                                    src={product.productImg}
                                    alt="cloth"
                                    className="img-fluid"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-9">
                                <div className="card-detail ps-3">
                                  <h5 className="card-title">
                                    <NavLink className="text-decoration-none">
                                      {product.title}
                                    </NavLink>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="total-price">
                              <span className="secondary-font fw-medium">
                                $ {product.price}.00
                              </span>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="total-price">
                              <span className="secondary-font fw-medium">
                                {product.category}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 align-middle">
                            <div className="d-flex align-items-center">
                              <div className="me-4">
                                <button
                                  onClick={() =>
                                    Navigate(`/products/${product._id}`)
                                  }
                                  className="btn btn-dark p-3 text-uppercase fs-6 btn-rounded-none w-100"
                                >
                                  <FaRegEdit />
                                </button>
                              </div>
                              <div
                                className="cart-remove"
                                onClick={() => handleDelete(product._id)}
                                style={{cursor: "pointer"}}
                              >
                                <MdDelete style={{ fontSize: "3rem" }} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
