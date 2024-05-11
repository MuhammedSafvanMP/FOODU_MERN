import express from "express";
import {  login, signup, userFindById } from "../controllers/authController.js";
// import uploadImage from "../middlewares/upload.js";
const router = express.Router();

router.post("/register",   signup);
router.post("/login", login);
router.get("/userid/:id", userFindById);




export default router;