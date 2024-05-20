import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import { TbLockCancel } from "react-icons/tb";
import { TbLockCheck } from "react-icons/tb";
import toast from "react-hot-toast";


export default function Users() {
 

  const [allUsers, setAllUsers] = useState([]);

  const [TRue, setFalse] = useState(true);

  useEffect(() => {
    const fetchAllUsers = async () => {
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

        const response = await axios.get(
          `http://localhost:3028/api/admin/viewAllUsers`,
          config
        );

        console.log(response.data.data);
        setAllUsers(response.data.data);

      } catch (error) {
        toast.error("Error fetching users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  const handleBlock = async (userId) => {

    try {
      const jwtToken = localStorage.getItem("adminToken");
      if (!jwtToken) {
        console.error("Token is not available");
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: jwtToken,
        },
      };


      const response = await axios.delete(
        `http://localhost:3028/api/admin/user/block/${userId}`,
        config
      );
      if(response.status === 200)
        toast.success("Blocked user");
      localStorage.removeItem("userTocken")
      localStorage.removeItem( "userId")

    } catch (error) {
      toast.error("Error fetching users:", error);
    }

  }

  const handleUnBlock = async (userId) => {

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

      const response = await axios.delete(
        `http://localhost:3028/api/admin/user/unblock/${userId}`,
        config
      );
      if(response.status === 200)
        toast.success("Un blocked user");

    } catch (error) {
      toast.error("Error fetching users:", error);
    }

  }





  return (
    <div className="container-fluid">
      <div className="row">
        <AdminNavbar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
          </div>

          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Block</th>
                  <th scope="col">Unblock</th>

                </tr>
              </thead>
              <tbody>
                {allUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td >
                    <TbLockCancel style={{fontSize: "1rem", cursor: "pointer", backgroundColor :  user.isDeleted == true ? "red" : "white" }} onClick={() =>  handleBlock(user._id)} />
                    </td>
                    <td >
                    <TbLockCheck style={{fontSize: "1rem", cursor: "pointer", backgroundColor :  user.isDeleted == false ? "green" : "white"  }}  onClick={() => handleUnBlock(user._id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> 
        </main>
      </div>
    </div>
  );
}
