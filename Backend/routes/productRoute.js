import express from "express";
import {  allProducts,  productGetId,  userProductByCategory  } from "../controllers/productController.js";
import { userToken } from "../middlewares/userMiddleware.js";
import { addToCart, cartFullQuantity, decrementCartItemQuantity, incrementCartItemQuantity, removeCart, viewCart } from "../controllers/cartController.js";
import { addToWishlist, removeWishlist, viewWishlist } from "../controllers/wishlistController.js";
import { OrderDetails,  payment, success } from "../controllers/userPaymentController.js";
import { TrycatchMiddleware } from "../middlewares/error.js";


const router = express.Router();


// products routes

router.get("/products",  TrycatchMiddleware (allProducts));
router.get("/products/:id", TrycatchMiddleware(productGetId));
router.get("/products/category/:categoryname", TrycatchMiddleware(userProductByCategory));

// token provides

router.use(userToken);

// cart routes

router.post("/:userid/cart/:id",  TrycatchMiddleware(addToCart));
router.get("/:id/cart",  TrycatchMiddleware(viewCart));
router.patch("/:userid/cart/:id/increment", TrycatchMiddleware( incrementCartItemQuantity));
router.patch("/:userid/cart/:id/decrement", TrycatchMiddleware( decrementCartItemQuantity));
router.delete("/:userId/cart/:itemId/remove", TrycatchMiddleware(removeCart));
router.get("/:id/total",  TrycatchMiddleware(cartFullQuantity))




// wishlist routes

router.post("/:userid/wishlist/:id",  TrycatchMiddleware(addToWishlist));
router.get("/:id/wishlist",  TrycatchMiddleware(viewWishlist));
router.delete("/:userId/wishlist/:itemId/remove",  TrycatchMiddleware(removeWishlist));


// payment routes

router.post("/:id/payment",  TrycatchMiddleware(payment));
router.get("/payment/success",  TrycatchMiddleware(success));
router.get("/:id/orders",  TrycatchMiddleware(OrderDetails));

export default router