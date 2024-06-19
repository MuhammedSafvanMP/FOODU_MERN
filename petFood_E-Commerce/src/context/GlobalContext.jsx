import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import instance from "../Axios";

export const globalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const Navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);
  const [show, setShow] = useState([]);
  const [user, setUser] = useState([]);
  const [dashbord, setDashBord] = useState({});
  const [active, setActive] = useState([]);
  const [wishActive, setWishActive] = useState([]);


  // wishlist adding

  const handleLike = async (id) => {
    try {
      await instance({
        url: `/users/${user?._id}/wishlist/${id}`,
        method: "POST",
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Product added to wishlist!");
        }
      });
    } catch (e) {
      toast.error(e.res?.data?.message);
    }
  };

  // cart adding
  
  const handleAdd = async (id) => {
    try {
      await instance({
        url: `/users/${user?._id}/cart/${id}`,
        method: "POST",
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Product added to cart!");
        } 
      });
    } catch (e) {
      toast.error(e.res?.data?.message);
    }
  };

  useEffect(() => {
    const foodData = async () => {
      const response = await axios.get(
        `http://localhost:3028/api/users/products`
      );
      setProducts(response.data.data);
      setFilteredData(response.data.data);
    };
    foodData();
  }, []);

  // const handleAdd = (id) => {
  //   const data = products.find((item) => item.id === id);
  //   let alreadyExists = false;

  //   for (let item of show.cartItems) {
  //     if (item.id === data.id) {
  //       alreadyExists = true;
  //       break;
  //     }
  //   }

  //   if (!alreadyExists) {
  //     show.cartItems.push({ ...data, amount: 1 });
  //   }

  // };

  // const handleSignup = (e) => {
  //   e.preventDefault();

  //   if (!/^[a-zA-Z]+([ ]?[a-zA-Z]+)*$/.test(e.target.name.value)) {
  //     alert("Please type a correct full name");
  //     return;
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.email.value)) {
  //     alert("Your email is wrong");
  //     return;
  //   } else if (e.target.password.value.length < 8) {
  //     alert("Password must be at least 8 characters long");
  //     return;
  //   }

  //   let name = e.target.name.value;
  //   let email = e.target.email.value;
  //   let password = e.target.password.value;

  //   const userName = { name, email, password, likeItems: [], cartItems: [] };

  //   setUser([...user, userName]);

  //   const existingUser = user.email === email;

  //   if (existingUser) {
  //     alert("User already exists");
  //     Navigate("/login");
  //   }

  //   Navigate("/login");
  // };

  return (
    <globalContext.Provider
      value={[
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
      ]}
    >
      {children}
    </globalContext.Provider>
  );
};
