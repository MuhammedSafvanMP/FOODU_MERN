import mongoose from "mongoose";



const ordersSchema = new mongoose.Schema({

    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products", 
        required: true,
    }],
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    orderTime: {
        type: String,
        required: true,
        default: new Date().toTimeString()
    },
    order: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,
        required: true
    },
    quantity:{
        type: Array,
        default: null,
    },
    orderStatus:{
        type:String,
        required:true,
        default:"Ordered"
    },
    
})

const Orders = mongoose.model("Orders", ordersSchema);
export default Orders;