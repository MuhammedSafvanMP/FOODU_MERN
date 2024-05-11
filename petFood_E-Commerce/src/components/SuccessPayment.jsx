import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function SuccessPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    let isSuccess = true;

    const fetchData = async () => {
      try {

         const jwtToken = localStorage.getItem("userTocken");
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

        const response = await axios.get(`http://localhost:3028/api/users/payment/success`, config);
        if (response.status === 200 && isSuccess) {
          toast.success("Payment successful");
          navigate("/");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    const timeoutId = setTimeout(fetchData, 3000);

    return () => {
      isSuccess = false;
      clearTimeout(timeoutId); // Clear the timeout when the component unmounts
    };
  }, [navigate]); // Include navigate in the dependency array

  return (
    <div className="payment-success d-flex justify-content-md-center">
      <img
        src="https://cdn.dribbble.com/users/253392/screenshots/6906291/check.gif"
        alt="Success"
      />
    </div>
  );
}

export default SuccessPayment;
