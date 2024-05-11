import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { globalContext } from "../context/GlobalContext";
import toast from "react-hot-toast";


export default function Login() {

  const [handleAdd, handleLike, filteredData, setFilteredData, user, setUser, search, setSearch, handleSignup,show,setShow,products, setProducts] = useContext(globalContext);

  const [login, setLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:3028/api/users/login",
        {
          email: login.email,
          password: login.password,
        }
      );

      if (response.status === 200) {
        const userData = response.data.user; 
        const userCookie = response.data.token

        localStorage.setItem("userTocken", userCookie)
        localStorage.setItem("userId", userData._id);  
        toast.success("Login successful");
        navigate("/");
        window.location.reload();
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };


  return (
    <>
      <section className="login-tabs padding-large">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-5">
              <p className="mb-0"> Log-In With Email</p>
              <hr className="my-1" />

              <form
                className="form-group flex-wrap"
                onSubmit={handleLogin}
              >
                <div className="form-input col-lg-12 my-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    className="form-control mb-3 p-4"
                    value={login.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="form-control mb-3 p-4"
                    value={login.password}
                    onChange={handleChange}
                  />

                  <div className="d-grid my-3">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg rounded-1"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
