import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };        toast.error(error.response.data.message);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3028/api/users/register",
        formData
      );
      
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
    }
  };

  return (
    <>
      <section className="login-tabs padding-large">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-5">
              <p className="mb-0">Sign-Up With Email</p>
              <hr className="my-1" />

              <form
                className="form-group flex-wrap"
                onSubmit={handleSubmit}
              >
                <div className="form-input col-lg-12 my-4">
                  <input
                    type="text"
                    name="username"
                    placeholder="Your full name"
                    className="form-control mb-3 p-4"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="form-control mb-3 p-4"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Set your password"
                    className="form-control mb-3 p-4"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <div className="d-grid my-3">
                    <button
                      type="submit"
                      className="btn btn-dark btn-lg rounded-1"
                    >
                      Sign Up
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
