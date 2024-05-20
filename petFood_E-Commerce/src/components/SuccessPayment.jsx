import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import instance from "../Axios";

function SuccessPayment() {
  const navigate = useNavigate();

  useEffect(() => {
    let isSuccess = true;

    const fetchData = async () => {
      try {
        await instance({
          url: `/users/payment/success`,
          method: "GET",
        }).then((res) => {
          if (res.status === 200 && isSuccess) {
            toast.success("Payment successful");
            navigate("/");
          }
        });
      } catch (e) {
        toast.error(e.res.data.message);
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
