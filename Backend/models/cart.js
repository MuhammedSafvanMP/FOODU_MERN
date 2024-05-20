import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1 // Default quantity is 1
    }
})

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;