import express from "express";
import {  allProducts,  productGetId,  userProductByCategory  } from "../controllers/productController.js";
import { userToken } from "../middlewares/userMiddleware.js";
import { addToCart, cartFullQuantity, decrementCartItemQuantity, incrementCartItemQuantity, removeCart, viewCart } from "../controllers/cartController.js";
import { addToWishlist, removeWishlist, viewWishlist } from "../controllers/wishlistController.js";
import { OrderDetails, cancel, payment, success } from "../controllers/userPaymentController.js";


const router = express.Router();

// products routes

router.get("/products", allProducts);
router.get("/products/:id", productGetId);
router.get("/products/category/:categoryname", userProductByCategory);

// cart routes

router.post("/:userid/cart/:id", userToken, addToCart);
router.get("/:id/cart", userToken, viewCart);
router.patch("/:userid/cart/:id/increment", userToken, incrementCartItemQuantity);
router.patch("/:userid/cart/:id/decrement", userToken, decrementCartItemQuantity);
router.delete("/:userId/cart/:itemId/remove", userToken, removeCart);
router.get("/:id/total", userToken, cartFullQuantity)




// wishlist routes

router.post("/:userid/wishlist/:id", userToken, addToWishlist);
router.get("/:id/wishlist", userToken, viewWishlist);
router.delete("/:userId/wishlist/:itemId/remove", userToken, removeWishlist);


// payment routes

router.post("/:id/payment", userToken, payment);
router.get("/payment/success", userToken, success);
router.post("/payment/cancel", userToken, cancel);
router.get("/:id/orders", userToken, OrderDetails);

export default router