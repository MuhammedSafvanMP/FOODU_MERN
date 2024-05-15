import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import authJoi from "../validation/authJoi.js";
import jwt from "jsonwebtoken";



// use sign up

export const signup = async (req, res) => {

        // const { username, email, password } = req.body;

        // // Check if username, email, and password are provided
        // if (!username || !email || !password) {
        //     return res.status(400).json({ message: "Username, email, and password are required" });
        // }

        // Validate request body using Joi
        const { result , error} = await authJoi.validateAsync(req.body);

        if (error.isJoi === true) {
            return res.status(422).json({ status: "error", message: "Validation Error", data: error.details });
        }
          
      

        // Check if email already exists
        const existingUser = await User.findOne({ email: result.email });
        if (existingUser) {
            return res.status(400).json({ status: "Ok", message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(result.password, 10);

        // Create a new user instance
        const newUser = new User({
            username : result.username,
            email: result.email,
            password: hashedPassword,
            // profileImg:  req.cloudinaryImageUrl      //req.file ? req.file.filename : null 
        });

        // Save the new user to the database
        await newUser.save();
        
        // Respond with success message
        return res.status(201).json({ message: "User created successfully" });
};


// use login

export const login =  async (req, res) => {
        
        const { email, password } = req.body;

          // find in user email in mongodb

        const validUser = await User.findOne({ email, isDeleted: false })
        if(!validUser)  return res.status(401).json({ staus: "error",  message: "User not found" });



        // checking  password
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if(!validPassword) return res.status(401).json({ staus: "error",  message: "Wrong credentials" });


        // jwt setting
        const token = jwt.sign({ id: validUser._id}, process.env.USER_JWT_SECRET)
        const { password: hashedPassword, ...rest } = validUser._doc;
        const expiryDate = new Date(Date.now() + 60 * 1000);

        // cookie setting 
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
        .status(200).json({ status: "Ok", message:"User login succfully", token, data: rest })
}


export const userFindById = async (req, res) => {

        const { id } = req.params;


        // fiding user in DB
        const findOneUser = await User.findById(id);

        if(!findOneUser){
            return res.status(404).json({ status: "error", message: "User not found"});
        }

        res.status(200).json({ status: "Ok", message: "User find", data: findOneUser });
}