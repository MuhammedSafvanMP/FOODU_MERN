import mongoose from "mongoose";

const userAddress = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }
})

const Address = mongoose.model("Address", userAddress);
export default Address;