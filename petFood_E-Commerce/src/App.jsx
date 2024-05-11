import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Whishlist from './components/Whishlist'
import SingleProduct from './components/SingleProduct'
import AddToCart from './components/AddToCart'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Error from './pages/Error'
import Foodies from './components/Foodies'
import Cards from './components/Cards'
import Dashbord from './admin/Dashbord'
import Users from './admin/Users'
import Products from './admin/Products'
import Update from './admin/Update'
import Header from './pages/Header'
import Services from './pages/Services'
import Footer from './pages/Footer'
import { globalContext } from './context/GlobalContext'
import SuccessPayment from './components/SuccessPayment'
import Order from './components/Order'
import Revanue from './admin/Revanue'
// import axios from 'axios'




// export const Axios= axios.create({
//   baseURL: "http://localhost:3028/",
//   headers: {
//     "Content-Type":"application/json",
//     Authorization:localStorage.getItem('userId')
//   }
// })


export default function App() {
  const [ handleAdd, handleLike, filteredData, setFilteredData, user, setUser, search, setSearch, handleSignup,show,setShow,products, setProducts,dashbord, setDashBord] = useContext(globalContext);
 
  const admin = localStorage.getItem("adminToken")
 
  return (
   <>
    {
      admin ?
      
      (
        <Routes>
        <Route path='/users' element={ <Users />  } />
        <Route path='/products' element={ <Products />  } />
        <Route path='/products/:id' element={ <Update  />  } />
      </Routes>
      )

      :
      (
        <>
        <Header />
      <Routes> 
          <Route path="/" element={<Home />} />
           <Route path='/whishlist' element={ <Whishlist />  } />
          <Route path='/product/:id' element={ <SingleProduct />  } />
          <Route path='/addcart' element={ <AddToCart />  } />
          <Route path='/login' element={ <Login />  } />
          <Route path='/signup' element={ <Signup />  } />
          <Route path='/product' element={ <Foodies />  } />
          <Route path='/cards' element={ <Cards />  } />
          <Route path="/payment/success" element={<SuccessPayment/>}/>
          <Route path='/dashbord' element={ <Dashbord />  } />
          <Route path='/order' element={ <Order />  } />
          <Route path='/sales' element={ <Revanue />  } />



          <Route path='*' element={ <Error /> } />
      </Routes>
      <Services />
      <Footer />
      </>
      )

    }
    
     
   </>
  )
}
