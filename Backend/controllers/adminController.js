import Jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModel.js";
dotenv.config();



// admin login

export const adminLogin = async (req, res) => {

        const { email, password } = req.body;

        // email and password checking 

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = Jwt.sign({ email }, process.env.ADMIN_JWT_SECRET);
             // cookie setting 
        res.cookie('access_token', token, { httpOnly: true })
        .json({
            statu: "Succes",
            message: "Admin logged in successfully",
            data: token,
          });

        } else
        return res.status(404).json({
            status: "error",
            message: "Invalid Admin🛑 ",
          });
    
};


// list all users


export const allUsers = async (req, res) => {
        // find all users in db

        const allUsers = await User.find()

        if(allUsers.length === 0){
            return res.status(404).json({
                status: "error",
                message: "No users in database ",
              });
        }

        res.status(200).json({status: "Ok", message: "Users found", data: allUsers});
}


// view user by Id

export const adminViewUserById = async (req, res ) => {
        const { id } = req.params;

        // fiding user in DB
        const findOneUser = await User.findById(id);

        if(!findOneUser){
            return res.status(404).json({status: "error",  message: "User not found"});
        }

        res.status(200).json({status:"Ok", message: "User find",  data:findOneUser});    
}


//  show user by Name

export const adminFindUserName = async (req, res) => {                                                                                            

        const { username } = req.params;
        // Find users by username containing the category name
        const users = await User.find({ username: { $regex: new RegExp(username, 'i') } }).select('username');
        
        if (users.length === 0) {
            return res.status(404).json({status: "error", message: "No users found" });
        }
        
        res.status(200).json({ status: "Ok", message: "User found",  data: users });
    
};


// delete user by id

export const adminBlockUserById = async (req, res ) => {
        const { userId } = req.params;

        const userDelete = await User.findOneAndUpdate({_id: userId}, {$set: {isDeleted: true}});

        if (!userDelete) {
            return res.status(404).json({status: "error", message: "No users found" });
        }

        res.status(200).json({ status: "Ok", message: "User Blocked successfully" });

}

export const adminUnBlockUserById = async (req, res ) => {
    
        const { userId } = req.params;

        const userDelete = await User.findOneAndUpdate({_id: userId}, {$set: {isDeleted: false}});

        if (!userDelete) {
            return res.status(404).json({status: "error", message: "No users found" });
        }

        res.status(200).json({ message: "User Unblocked successfully" });    
}