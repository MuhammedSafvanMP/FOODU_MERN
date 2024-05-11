import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


export const globalContext = createContext();


export const GlobalProvider = ({ children }) => {
  const Navigate = useNavigate();

  
  
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([])
  const [show, setShow] = useState(null)
  const [user, setUser] = useState([]);
  const [dashbord, setDashBord] = useState({});
  
  useEffect(() => {
    
    const foodData = async () => {
      const response =  await  axios.get(`http://localhost:3028/api/users/products`)
         setProducts(response.data.products)
         setFilteredData(response.data.products);
     }
    
     
     foodData()
    }, [])
    
    
    
    const handleLike = async (id) => {
      window.location.reload()
      try {
          const jwtToken = localStorage.getItem("userTocken");
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
  
  
          const response = await axios.post(`http://localhost:3028/api/users/${user?._id}/wishlist/${id}`, {}, config);
          
          console.log(response); // Log the response for debugging
  
          if (response.status === 200) {
              console.log("Product added to wishlist");
          } else {
              console.error("Error adding product to wishlist:", response.data); // Log error response
          }
      } catch (error) {
          console.error("Error:", error.response.data.message); // Log any other errors
      }
  };
  
 

  const handleAdd = async (id) => {
   window.location.reload()
    try {
      const jwtToken = localStorage.getItem("userTocken");
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


    const response = await axios.post(`http://localhost:3028/api/users/${user?._id}/cart/${id}`, {}, config);
      
      console.log(response); // Log the response for debugging

      if (response.status === 200) {
          console.log("Product added to cart");
      } else {
          console.error("Error adding product to cart:", response.data); // Log error response
      }
  } catch (error) {
      console.error("Error:", error.response.data.message); // Log any other errors
  }
  
  };
  
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
  
  
  
  
  

  const handleSignup = (e) => {
    e.preventDefault();

    if (!/^[a-zA-Z]+([ ]?[a-zA-Z]+)*$/.test(e.target.name.value)) {
      alert('Please type a correct full name');
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.email.value)) {
      alert('Your email is wrong');
      return;
    } else if (e.target.password.value.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    const userName = { name, email,  password, likeItems: [], cartItems: []}

    setUser([...user, userName ])

    const existingUser = user.email === email;

    if (existingUser) {
      alert('User already exists');
      Navigate('/login');
    }

    Navigate('/login');
  };




  return (
    <globalContext.Provider value={[ handleAdd, handleLike, filteredData, setFilteredData, user, setUser, search, setSearch, handleSignup,show,setShow,products, setProducts,dashbord, setDashBord]}>
      {children}
    </globalContext.Provider>
  );
};
