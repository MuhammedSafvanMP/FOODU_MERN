import express from "express";
import { adminDeleteProductById, adminProductByCategory, adminUpdateProducts, adminViewAllProducts, adminViewProductById, createProducts } from "../controllers/adminProductsAddController.js";
import uploadImage from "../middlewares/upload.js";
import { adminToken } from "../middlewares/adminMiddleware.js";
import {  adminBlockUserById, adminFindUserName, adminLogin, adminUnBlockUserById, adminViewUserById, allUsers } from "../controllers/adminController.js";
import { Delivered, OntheWay, adminOrderDetails, shipped, status } from "../controllers/adminOrders.js";
import { TrycatchMiddleware } from "../middlewares/error.js";

const router = express.Router();


// login
router.post("/login", adminLogin);

// token provide all rotes
router.use(adminToken)

// admin routes
// view all users
router.get("/viewAllUsers",   TrycatchMiddleware( allUsers)); 
// view user by id
router.get("/user/:id",  TrycatchMiddleware( adminViewUserById)); 
// search user name
router.get("/user/findName/:username", TrycatchMiddleware( adminFindUserName));
// delete user
router.delete("/user/block/:userId",  TrycatchMiddleware(adminBlockUserById));
router.delete("/user/unblock/:userId",  TrycatchMiddleware(adminUnBlockUserById));





// product creating
router.post("/createProducts",   uploadImage, TrycatchMiddleware(createProducts)); 
// view all products
router.get("/products",  TrycatchMiddleware(adminViewAllProducts));
// view spesific user
router.get("/products/:id", TrycatchMiddleware(adminViewProductById));
// view product category
router.get("/products/category/:categoryname",  TrycatchMiddleware(adminProductByCategory));
// edit product by id
router.put("/products/edit/:id",  uploadImage, TrycatchMiddleware(adminUpdateProducts));
// delete product by id
router.delete("/products/delete/:productId",  TrycatchMiddleware(adminDeleteProductById));



// orders routes

// view all orders
router.get('/orders', TrycatchMiddleware(adminOrderDetails));
// shipped
router.patch('/shipped/:id', TrycatchMiddleware(shipped));
// on the way
router.patch('/ontheway/:id', TrycatchMiddleware(OntheWay));
// deliverd
router.patch('/delivered/:id', TrycatchMiddleware(Delivered));
// view all revenue status
router.get('/status',  TrycatchMiddleware(status));



export default router