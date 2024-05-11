import React,{ useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";


export default function Dashbord() {
  const Navigate = useNavigate();


  const [adminLogin, setAdminLogin] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setAdminLogin({ ...adminLogin, [e.target.name]: e.target.value });
  };

  const handleAdmin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3028/api/admin/login",
        {
          email: adminLogin.email,
          password: adminLogin.password,
        }
      );

      if (response.status === 200) {
        const AdminData = response.data.token;
        localStorage.setItem("adminToken", AdminData)

       // Set user ID in local storage
        toast.success("admin Login successful");
        Navigate("/users");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
       toast.error("Login failed. Please try again.", error);
    }

  };




  return (
    <>
     
      <section className="login-tabs padding-large">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 mt-5">
              <p className="mb-0">Admin Login</p>
              <hr className="my-1" />

              <form
                className="form-group flex-wrap"
                onSubmit={(e) => handleAdmin(e)}
              >
                <div className="form-input col-lg-12 my-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="form-control mb-3 p-4"
                    value={adminLogin.email}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="form-control mb-3 p-4"
                    value={adminLogin.password}
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
