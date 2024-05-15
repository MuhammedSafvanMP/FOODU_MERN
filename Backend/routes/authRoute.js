import express from "express";
import {  login, signup, userFindById } from "../controllers/authController.js";
import { TrycatchMiddleware } from "../middlewares/error.js";
// import uploadImage from "../middlewares/upload.js";
const router = express.Router();


router.post("/register",   TrycatchMiddleware(signup));
router.post("/login", TrycatchMiddleware(login));
router.get("/userid/:id",  TrycatchMiddleware(userFindById));




export default router;